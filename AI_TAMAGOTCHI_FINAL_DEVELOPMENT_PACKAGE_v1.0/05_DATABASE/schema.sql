-- AI-Tamagotchi / Lyuboznayka
-- Stage 5 current canonical PostgreSQL baseline restored during Stage-19 remediation.
-- Application code generates UUID values; no PostgreSQL UUID extension is required.
-- TIMESTAMPTZ stores instants; business dates are explicit Europe/Moscow DATE values.

CREATE SCHEMA IF NOT EXISTS app;
SET search_path TO app, public;

CREATE TYPE app_role AS ENUM ('employee','director','executive','admin');
CREATE TYPE account_status AS ENUM ('active','blocked','terminated');
CREATE TYPE privacy_level AS ENUM ('closed','standard','open');
CREATE TYPE input_channel AS ENUM ('text','voice_transcript');
CREATE TYPE task_status AS ENUM ('active','deleted');
CREATE TYPE task_version_state AS ENUM ('accepted','processing','waiting_clarification','assessed','superseded');
CREATE TYPE task_version_reason AS ENUM ('initial','user_edit','system_reprocess');
CREATE TYPE complexity_level AS ENUM ('C1','C2','C3','C4','C5');
CREATE TYPE plausibility_status AS ENUM ('valid','ambiguous','capability_conflict','internal_contradiction','insufficient_data');
CREATE TYPE clarification_reason AS ENUM ('plausibility','duplicate','complexity','missing_data');
CREATE TYPE clarification_answer_channel AS ENUM ('text','voice');
CREATE TYPE processing_status AS ENUM ('pending','processing','waiting_clarification','completed','failed','stale');
CREATE TYPE provider_kind AS ENUM ('personnel','llm','stt','weather','object_storage');
CREATE TYPE provider_call_status AS ENUM ('started','succeeded','failed','cancelled');
CREATE TYPE health_state AS ENUM ('happy','normal','bored','tired','very_weak','coma');
CREATE TYPE evolution_stage AS ENUM ('E1','E2','E3','E4','E5');
CREATE TYPE pet_event_type AS ENUM ('hp_state_change','coma','recovery','vacation','evolution','achievement','cosmetic','annual_award');
CREATE TYPE score_source_type AS ENUM ('task','monthly_goal','streak_milestone','achievement','year_adjustment','system_reversal');
CREATE TYPE goal_cycle_status AS ENUM ('pending_setup','required_setup','active','closed');
CREATE TYPE goal_source AS ENUM ('employee_choice','system_assigned');
CREATE TYPE cosmetic_type AS ENUM ('universal','branch','status');
CREATE TYPE notification_type AS ENUM ('pet_health','goal','streak','progress','ranking');
CREATE TYPE calendar_day_type AS ENUM ('workday','weekend','public_holiday','corporate_day_off','manual_override');
CREATE TYPE export_format AS ENUM ('csv','xlsx');
CREATE TYPE export_type AS ENUM ('task_current','task_audit','aggregate');
CREATE TYPE export_scope AS ENUM ('directorate','company');
CREATE TYPE export_status AS ENUM ('pending','running','completed','failed','cancelled');
CREATE TYPE audit_actor_type AS ENUM ('employee','admin','system','ai');
CREATE TYPE system_version_type AS ENUM ('scoring_rubric','extraction_prompt','extraction_schema','plausibility_knowledge','goal_generator','game_rules');
CREATE TYPE scheduled_job_status AS ENUM ('pending','running','completed','failed');

CREATE TABLE schema_migrations (
    migration_id text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE system_versions (
    system_version_id uuid PRIMARY KEY,
    version_type system_version_type NOT NULL,
    version_key varchar(128) NOT NULL,
    content_hash varchar(128),
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (version_type, version_key),
    CHECK (jsonb_typeof(metadata)='object')
);

CREATE TABLE directorates (
    directorate_id uuid PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE,
    director_employee_id uuid,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE employees (
    employee_id uuid PRIMARY KEY,
    personnel_number varchar(128) NOT NULL UNIQUE,
    full_name varchar(255) NOT NULL,
    phone varchar(64) NOT NULL,
    current_directorate_id uuid NOT NULL REFERENCES directorates(directorate_id),
    role app_role NOT NULL DEFAULT 'employee',
    account_status account_status NOT NULL DEFAULT 'active',
    profile_hidden boolean NOT NULL DEFAULT false,
    privacy_level privacy_level NOT NULL DEFAULT 'standard',
    authorized_at timestamptz,
    onboarding_completed_at timestamptz,
    terminated_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK ((account_status='terminated' AND terminated_at IS NOT NULL) OR account_status<>'terminated')
);
ALTER TABLE directorates ADD CONSTRAINT fk_directorates_director_employee FOREIGN KEY (director_employee_id) REFERENCES employees(employee_id);

CREATE TABLE personnel_provider_links (
    personnel_provider_link_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    provider_key varchar(128) NOT NULL,
    external_subject_key varchar(255),
    provider_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    last_verified_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (employee_id, provider_key),
    UNIQUE (provider_key, external_subject_key),
    CHECK (jsonb_typeof(provider_metadata)='object')
);

CREATE TABLE employee_directorate_history (
    history_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    directorate_id uuid NOT NULL REFERENCES directorates(directorate_id),
    valid_from timestamptz NOT NULL,
    valid_to timestamptz,
    changed_by_employee_id uuid REFERENCES employees(employee_id),
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (valid_to IS NULL OR valid_to>valid_from)
);

CREATE TABLE directorate_director_assignments (
    assignment_id uuid PRIMARY KEY,
    directorate_id uuid NOT NULL REFERENCES directorates(directorate_id),
    director_employee_id uuid NOT NULL REFERENCES employees(employee_id),
    valid_from timestamptz NOT NULL,
    valid_to timestamptz,
    changed_by_employee_id uuid REFERENCES employees(employee_id),
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (valid_to IS NULL OR valid_to>valid_from)
);

CREATE TABLE auth_sessions (
    session_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    session_token_hash varchar(255) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL,
    last_seen_at timestamptz,
    revoked_at timestamptz,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    CHECK (expires_at>created_at),
    CHECK (jsonb_typeof(metadata)='object')
);

CREATE TABLE vacation_periods (
    vacation_period_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    started_at timestamptz NOT NULL,
    ended_at timestamptz,
    started_by_employee_id uuid NOT NULL REFERENCES employees(employee_id),
    ended_by_employee_id uuid REFERENCES employees(employee_id),
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (ended_at IS NULL OR ended_at>started_at)
);

CREATE TABLE corporate_calendar (
    calendar_date date PRIMARY KEY,
    is_working_day boolean NOT NULL,
    day_type calendar_day_type NOT NULL,
    reason varchar(255) NOT NULL,
    created_by_employee_id uuid REFERENCES employees(employee_id),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE taxonomy_versions (
    taxonomy_version_id uuid PRIMARY KEY,
    version_key varchar(128) NOT NULL UNIQUE,
    is_current boolean NOT NULL DEFAULT false,
    created_by_employee_id uuid REFERENCES employees(employee_id),
    created_at timestamptz NOT NULL DEFAULT now(),
    notes text
);

CREATE TABLE categories (
    category_id uuid PRIMARY KEY,
    taxonomy_version_id uuid NOT NULL REFERENCES taxonomy_versions(taxonomy_version_id),
    stable_code varchar(128) NOT NULL,
    name varchar(255) NOT NULL,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (taxonomy_version_id, stable_code),
    UNIQUE (category_id, taxonomy_version_id)
);

CREATE TABLE subcategories (
    subcategory_id uuid PRIMARY KEY,
    taxonomy_version_id uuid NOT NULL,
    category_id uuid NOT NULL,
    stable_code varchar(128) NOT NULL,
    name varchar(255) NOT NULL,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (taxonomy_version_id, category_id, stable_code),
    UNIQUE (subcategory_id, category_id, taxonomy_version_id),
    FOREIGN KEY (category_id, taxonomy_version_id) REFERENCES categories(category_id, taxonomy_version_id)
);

CREATE TABLE ai_tools (
    tool_id uuid PRIMARY KEY,
    tool_name varchar(255) NOT NULL UNIQUE,
    provider varchar(255),
    tool_type varchar(128) NOT NULL,
    active boolean NOT NULL DEFAULT true,
    date_added date NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE ai_tool_aliases (
    alias_id uuid PRIMARY KEY,
    tool_id uuid NOT NULL REFERENCES ai_tools(tool_id),
    alias_normalized varchar(255) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE tool_capabilities (
    capability_id uuid PRIMARY KEY,
    tool_id uuid NOT NULL REFERENCES ai_tools(tool_id),
    knowledge_version_id uuid NOT NULL REFERENCES system_versions(system_version_id),
    capability_code varchar(128) NOT NULL,
    is_supported boolean NOT NULL,
    valid_from date NOT NULL,
    valid_to date,
    source_note text,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (tool_id, knowledge_version_id, capability_code, valid_from),
    CHECK (valid_to IS NULL OR valid_to>=valid_from)
);

CREATE TABLE tasks (
    task_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    current_version_id uuid,
    registered_at timestamptz NOT NULL,
    registered_date_spb date NOT NULL,
    directorate_id_at_registration uuid NOT NULL REFERENCES directorates(directorate_id),
    initial_input_channel input_channel NOT NULL,
    status task_status NOT NULL DEFAULT 'active',
    deleted_at timestamptz,
    deleted_by_employee_id uuid REFERENCES employees(employee_id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK ((status='active' AND deleted_at IS NULL) OR (status='deleted' AND deleted_at IS NOT NULL)),
    CHECK (registered_date_spb=((registered_at AT TIME ZONE 'Europe/Moscow')::date))
);

CREATE TABLE task_versions (
    task_version_id uuid PRIMARY KEY,
    task_id uuid NOT NULL REFERENCES tasks(task_id),
    version_no integer NOT NULL CHECK (version_no>=1),
    input_channel input_channel NOT NULL,
    raw_input text NOT NULL,
    normalized_description text,
    complexity_level complexity_level,
    task_score integer,
    scoring_explanation text,
    confidence numeric(5,4),
    plausibility_status plausibility_status,
    taxonomy_version_id uuid,
    primary_category_id uuid,
    subcategory_id uuid,
    directorate_id_at_task_time uuid NOT NULL REFERENCES directorates(directorate_id),
    is_current boolean NOT NULL DEFAULT false,
    version_state task_version_state NOT NULL DEFAULT 'accepted',
    created_reason task_version_reason NOT NULL,
    committed_processing_run_id uuid,
    created_at timestamptz NOT NULL DEFAULT now(),
    assessed_at timestamptz,
    UNIQUE (task_id, version_no),
    UNIQUE (task_version_id, task_id),
    FOREIGN KEY (primary_category_id, taxonomy_version_id) REFERENCES categories(category_id, taxonomy_version_id),
    FOREIGN KEY (subcategory_id, primary_category_id, taxonomy_version_id) REFERENCES subcategories(subcategory_id, category_id, taxonomy_version_id),
    CHECK (task_score IS NULL OR task_score IN (1,5,15,40,100)),
    CHECK (complexity_level IS NULL OR task_score IS NULL OR
      (complexity_level='C1' AND task_score=1) OR (complexity_level='C2' AND task_score=5) OR
      (complexity_level='C3' AND task_score=15) OR (complexity_level='C4' AND task_score=40) OR
      (complexity_level='C5' AND task_score=100)),
    CHECK (confidence IS NULL OR (confidence>=0 AND confidence<=1)),
    CHECK (version_state<>'assessed' OR (
      normalized_description IS NOT NULL AND complexity_level IS NOT NULL AND task_score IS NOT NULL AND
      scoring_explanation IS NOT NULL AND plausibility_status IS NOT NULL AND taxonomy_version_id IS NOT NULL AND
      primary_category_id IS NOT NULL AND committed_processing_run_id IS NOT NULL AND assessed_at IS NOT NULL))
);
ALTER TABLE tasks ADD CONSTRAINT fk_tasks_current_version FOREIGN KEY (current_version_id, task_id) REFERENCES task_versions(task_version_id, task_id);

CREATE TABLE task_links (
    task_link_id uuid PRIMARY KEY,
    task_version_id uuid NOT NULL REFERENCES task_versions(task_version_id),
    url text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (task_version_id, url)
);

CREATE TABLE task_tags (
    task_tag_id uuid PRIMARY KEY,
    task_version_id uuid NOT NULL REFERENCES task_versions(task_version_id),
    tag varchar(128) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (task_version_id, tag)
);

CREATE TABLE task_tools (
    task_tool_id uuid PRIMARY KEY,
    task_version_id uuid NOT NULL REFERENCES task_versions(task_version_id),
    tool_id uuid REFERENCES ai_tools(tool_id),
    unrecognized_tool_name varchar(255),
    is_primary boolean NOT NULL DEFAULT false,
    workflow_order smallint,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK ((tool_id IS NOT NULL)::integer + (unrecognized_tool_name IS NOT NULL)::integer = 1),
    CHECK (workflow_order IS NULL OR workflow_order>=1)
);

CREATE TABLE stt_runs (
    stt_run_id uuid PRIMARY KEY,
    task_version_id uuid REFERENCES task_versions(task_version_id),
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    status varchar(32) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed')),
    provider_key varchar(128),
    model_identifier varchar(255),
    transcript text,
    provider_request_id varchar(255),
    source_audio_deleted_at timestamptz,
    error_code varchar(128),
    created_at timestamptz NOT NULL DEFAULT now(),
    finished_at timestamptz
);

CREATE TABLE ai_processing_runs (
    processing_run_id uuid PRIMARY KEY,
    task_version_id uuid NOT NULL REFERENCES task_versions(task_version_id),
    run_no integer NOT NULL CHECK (run_no>=1),
    status processing_status NOT NULL DEFAULT 'pending',
    provider_key varchar(128),
    model_identifier varchar(255),
    model_version varchar(255),
    scoring_rubric_version_id uuid REFERENCES system_versions(system_version_id),
    extraction_prompt_version_id uuid REFERENCES system_versions(system_version_id),
    extraction_schema_version_id uuid REFERENCES system_versions(system_version_id),
    plausibility_knowledge_version_id uuid REFERENCES system_versions(system_version_id),
    goal_generator_version_id uuid REFERENCES system_versions(system_version_id),
    taxonomy_version_id uuid REFERENCES taxonomy_versions(taxonomy_version_id),
    clarification_count smallint NOT NULL DEFAULT 0 CHECK (clarification_count BETWEEN 0 AND 3),
    result_json jsonb,
    error_code varchar(128),
    error_detail text,
    started_at timestamptz,
    finished_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (task_version_id, run_no),
    UNIQUE (processing_run_id, task_version_id),
    CHECK (result_json IS NULL OR jsonb_typeof(result_json)='object'),
    CHECK (status<>'completed' OR (
      model_identifier IS NOT NULL AND scoring_rubric_version_id IS NOT NULL AND extraction_prompt_version_id IS NOT NULL AND
      extraction_schema_version_id IS NOT NULL AND plausibility_knowledge_version_id IS NOT NULL AND taxonomy_version_id IS NOT NULL AND finished_at IS NOT NULL))
);
ALTER TABLE task_versions ADD CONSTRAINT fk_task_versions_committed_processing_run FOREIGN KEY (committed_processing_run_id, task_version_id) REFERENCES ai_processing_runs(processing_run_id, task_version_id);

CREATE TABLE task_clarifications (
    clarification_id uuid PRIMARY KEY,
    task_version_id uuid NOT NULL REFERENCES task_versions(task_version_id),
    processing_run_id uuid NOT NULL,
    sequence_no smallint NOT NULL CHECK (sequence_no BETWEEN 1 AND 3),
    reason clarification_reason NOT NULL,
    question_text text NOT NULL,
    answer_text text,
    answer_channel clarification_answer_channel,
    changed_classification boolean,
    asked_at timestamptz NOT NULL DEFAULT now(),
    answered_at timestamptz,
    UNIQUE (task_version_id, sequence_no),
    FOREIGN KEY (processing_run_id, task_version_id) REFERENCES ai_processing_runs(processing_run_id, task_version_id),
    CHECK ((answer_text IS NULL AND answered_at IS NULL AND answer_channel IS NULL) OR (answer_text IS NOT NULL AND answered_at IS NOT NULL AND answer_channel IS NOT NULL))
);

CREATE TABLE scoring_evidence (
    evidence_id uuid PRIMARY KEY,
    task_version_id uuid NOT NULL REFERENCES task_versions(task_version_id),
    processing_run_id uuid NOT NULL UNIQUE,
    multi_step boolean NOT NULL DEFAULT false,
    data_processing boolean NOT NULL DEFAULT false,
    analysis_modeling boolean NOT NULL DEFAULT false,
    coding boolean NOT NULL DEFAULT false,
    automation boolean NOT NULL DEFAULT false,
    system_integration boolean NOT NULL DEFAULT false,
    reusable_workflow boolean NOT NULL DEFAULT false,
    agentic_workflow boolean NOT NULL DEFAULT false,
    multi_tool_workflow boolean NOT NULL DEFAULT false,
    iterative_validation boolean NOT NULL DEFAULT false,
    evidence_json jsonb,
    model_rule_version_id uuid REFERENCES system_versions(system_version_id),
    created_at timestamptz NOT NULL DEFAULT now(),
    FOREIGN KEY (processing_run_id, task_version_id) REFERENCES ai_processing_runs(processing_run_id, task_version_id),
    CHECK (evidence_json IS NULL OR jsonb_typeof(evidence_json)='object')
);

CREATE TABLE scores_ledger (
    ledger_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    source_type score_source_type NOT NULL,
    source_id text NOT NULL,
    annual_score_delta integer NOT NULL DEFAULT 0,
    lifetime_task_score_delta integer NOT NULL DEFAULT 0,
    evolution_xp_delta integer NOT NULL DEFAULT 0,
    directorate_id_at_event uuid NOT NULL REFERENCES directorates(directorate_id),
    event_date_spb date NOT NULL,
    score_year smallint NOT NULL,
    rule_version_id uuid REFERENCES system_versions(system_version_id),
    reversal_of_ledger_id uuid REFERENCES scores_ledger(ledger_id),
    idempotency_key varchar(255) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (annual_score_delta<>0 OR lifetime_task_score_delta<>0 OR evolution_xp_delta<>0),
    CHECK (evolution_xp_delta>=0),
    CHECK (score_year=EXTRACT(YEAR FROM event_date_spb)::smallint),
    CHECK ((source_type='system_reversal' AND reversal_of_ledger_id IS NOT NULL) OR (source_type<>'system_reversal' AND reversal_of_ledger_id IS NULL)),
    CHECK (reversal_of_ledger_id IS NULL OR reversal_of_ledger_id<>ledger_id)
);

CREATE VIEW xp_ledger AS
SELECT ledger_id, employee_id, source_type, source_id, evolution_xp_delta AS xp_delta,
       directorate_id_at_event, event_date_spb, rule_version_id, created_at
FROM scores_ledger WHERE evolution_xp_delta<>0;

CREATE TABLE pet_state (
    employee_id uuid PRIMARY KEY REFERENCES employees(employee_id),
    hp smallint NOT NULL CHECK (hp BETWEEN 0 AND 100),
    health_state health_state NOT NULL,
    in_vacation boolean NOT NULL DEFAULT false,
    vacation_started_at timestamptz,
    current_streak integer NOT NULL DEFAULT 0 CHECK (current_streak>=0),
    best_streak integer NOT NULL DEFAULT 0 CHECK (best_streak>=0),
    evolution_xp integer NOT NULL DEFAULT 0 CHECK (evolution_xp>=0),
    evolution_stage evolution_stage NOT NULL,
    evolution_branch varchar(128),
    coma_recovery_active_days integer NOT NULL DEFAULT 0 CHECK (coma_recovery_active_days>=0),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (best_streak>=current_streak),
    CHECK ((in_vacation=false AND vacation_started_at IS NULL) OR (in_vacation=true AND vacation_started_at IS NOT NULL)),
    CHECK ((hp BETWEEN 80 AND 100 AND health_state='happy') OR (hp BETWEEN 60 AND 79 AND health_state='normal') OR
           (hp BETWEEN 40 AND 59 AND health_state='bored') OR (hp BETWEEN 20 AND 39 AND health_state='tired') OR
           (hp BETWEEN 1 AND 19 AND health_state='very_weak') OR (hp=0 AND health_state='coma'))
);

CREATE TABLE pet_events (
    event_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    event_type pet_event_type NOT NULL,
    old_value jsonb,
    new_value jsonb,
    related_entity_type varchar(128),
    related_entity_id text,
    business_date_spb date,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (old_value IS NULL OR jsonb_typeof(old_value)='object'),
    CHECK (new_value IS NULL OR jsonb_typeof(new_value)='object')
);

CREATE TABLE daily_activity (
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    activity_date_spb date NOT NULL,
    is_working_day boolean NOT NULL,
    in_vacation boolean NOT NULL,
    task_count integer NOT NULL DEFAULT 0 CHECK (task_count>=0),
    max_complexity complexity_level,
    hp_delta integer NOT NULL DEFAULT 0,
    streak_day boolean NOT NULL DEFAULT false,
    close_processed_at timestamptz,
    recalculated_at timestamptz,
    rule_version_id uuid REFERENCES system_versions(system_version_id),
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (employee_id, activity_date_spb),
    CHECK ((task_count=0 AND max_complexity IS NULL) OR (task_count>0 AND max_complexity IS NOT NULL))
);

CREATE TABLE streak_milestone_awards (
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    milestone_days integer NOT NULL CHECK (milestone_days IN (5,10,20,40,80,160)),
    evolution_xp_awarded integer NOT NULL CHECK (evolution_xp_awarded>=0),
    awarded_at timestamptz NOT NULL,
    rule_version_id uuid REFERENCES system_versions(system_version_id),
    PRIMARY KEY (employee_id, milestone_days)
);

CREATE TABLE monthly_goal_cycles (
    cycle_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    month_start date NOT NULL,
    status goal_cycle_status NOT NULL DEFAULT 'pending_setup',
    setup_required_at timestamptz,
    setup_at timestamptz,
    closed_at timestamptz,
    goal_generator_version_id uuid REFERENCES system_versions(system_version_id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (employee_id, month_start),
    CHECK (EXTRACT(DAY FROM month_start)=1)
);

CREATE TABLE goal_options (
    option_id uuid PRIMARY KEY,
    cycle_id uuid NOT NULL REFERENCES monthly_goal_cycles(cycle_id),
    option_no smallint NOT NULL CHECK (option_no BETWEEN 1 AND 5),
    text text NOT NULL,
    rule_json jsonb NOT NULL,
    target_value numeric(12,4) NOT NULL CHECK (target_value>0),
    selected boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (cycle_id, option_no),
    UNIQUE (option_id, cycle_id),
    CHECK (jsonb_typeof(rule_json)='object')
);

CREATE TABLE goals (
    goal_id uuid PRIMARY KEY,
    cycle_id uuid NOT NULL REFERENCES monthly_goal_cycles(cycle_id),
    slot_no smallint NOT NULL CHECK (slot_no BETWEEN 1 AND 3),
    source goal_source NOT NULL,
    source_option_id uuid,
    text text NOT NULL,
    rule_json jsonb NOT NULL,
    target_value numeric(12,4) NOT NULL CHECK (target_value>0),
    current_value numeric(12,4) NOT NULL DEFAULT 0 CHECK (current_value>=0),
    completed boolean NOT NULL DEFAULT false,
    completed_at timestamptz,
    annual_score_bonus integer NOT NULL DEFAULT 0 CHECK (annual_score_bonus>=0),
    evolution_xp_bonus integer NOT NULL DEFAULT 0 CHECK (evolution_xp_bonus>=0),
    reward_applied_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (cycle_id, slot_no),
    FOREIGN KEY (source_option_id, cycle_id) REFERENCES goal_options(option_id, cycle_id),
    CHECK (jsonb_typeof(rule_json)='object'),
    CHECK (current_value<=target_value),
    CHECK ((completed=false AND completed_at IS NULL) OR (completed=true AND completed_at IS NOT NULL)),
    CHECK ((source='employee_choice' AND source_option_id IS NOT NULL) OR (source='system_assigned' AND source_option_id IS NULL))
);

CREATE TABLE goal_task_matches (
    match_id uuid PRIMARY KEY,
    goal_id uuid NOT NULL REFERENCES goals(goal_id),
    task_version_id uuid NOT NULL REFERENCES task_versions(task_version_id),
    match_value numeric(12,4) NOT NULL CHECK (match_value>0),
    matched_at timestamptz NOT NULL DEFAULT now(),
    active boolean NOT NULL DEFAULT true,
    reversed_at timestamptz,
    reversal_reason varchar(255),
    idempotency_key varchar(255) NOT NULL UNIQUE,
    UNIQUE (goal_id, task_version_id),
    CHECK ((active=true AND reversed_at IS NULL) OR (active=false AND reversed_at IS NOT NULL))
);

CREATE VIEW goal_ledger AS
SELECT match_id, goal_id, task_version_id, match_value, active,
       CASE WHEN active THEN match_value ELSE 0 END AS effective_match_value,
       matched_at, reversed_at, idempotency_key
FROM goal_task_matches;

CREATE TABLE cosmetics (
    cosmetic_id uuid PRIMARY KEY,
    code varchar(128) NOT NULL UNIQUE,
    type cosmetic_type NOT NULL,
    branch varchar(128),
    rarity varchar(64),
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE achievements (
    achievement_id uuid PRIMARY KEY,
    code varchar(128) NOT NULL UNIQUE,
    title varchar(255) NOT NULL,
    condition_json jsonb NOT NULL,
    evolution_xp_reward integer NOT NULL DEFAULT 0 CHECK (evolution_xp_reward>=0),
    cosmetic_id uuid REFERENCES cosmetics(cosmetic_id),
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (jsonb_typeof(condition_json)='object')
);

CREATE TABLE employee_achievements (
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    achievement_id uuid NOT NULL REFERENCES achievements(achievement_id),
    earned_at timestamptz NOT NULL,
    source_ref text,
    PRIMARY KEY (employee_id, achievement_id)
);

CREATE TABLE employee_cosmetics (
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    cosmetic_id uuid NOT NULL REFERENCES cosmetics(cosmetic_id),
    earned_at timestamptz NOT NULL,
    source_ref text,
    PRIMARY KEY (employee_id, cosmetic_id)
);

CREATE TABLE employee_leaderboard_snapshots (
    snapshot_id uuid PRIMARY KEY,
    snapshot_date date NOT NULL,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    annual_score integer NOT NULL,
    rank integer NOT NULL CHECK (rank>=1),
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (snapshot_date, employee_id)
);

CREATE TABLE directorate_leaderboard_snapshots (
    snapshot_id uuid PRIMARY KEY,
    snapshot_date date NOT NULL,
    directorate_id uuid NOT NULL REFERENCES directorates(directorate_id),
    annual_score integer NOT NULL,
    rank integer NOT NULL CHECK (rank>=1),
    average_score numeric(14,4) NOT NULL,
    total_score integer NOT NULL,
    authorized_headcount integer NOT NULL CHECK (authorized_headcount>=0),
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (snapshot_date, directorate_id)
);

CREATE TABLE notifications (
    notification_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    type notification_type NOT NULL,
    title varchar(255) NOT NULL,
    body text NOT NULL,
    related_entity_type varchar(128),
    related_entity_id text,
    source_event_id uuid,
    read_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK ((related_entity_type IS NULL AND related_entity_id IS NULL) OR (related_entity_type IS NOT NULL AND related_entity_id IS NOT NULL))
);

CREATE TABLE ambient_reactions (
    ambient_reaction_id uuid PRIMARY KEY,
    employee_id uuid NOT NULL REFERENCES employees(employee_id),
    business_date_spb date NOT NULL,
    sequence_no smallint NOT NULL CHECK (sequence_no BETWEEN 1 AND 2),
    context_type varchar(64) NOT NULL,
    content_text text NOT NULL,
    context_json jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (employee_id, business_date_spb, sequence_no),
    CHECK (jsonb_typeof(context_json)='object')
);

CREATE TABLE export_requests (
    export_request_id uuid PRIMARY KEY,
    requested_by_employee_id uuid NOT NULL REFERENCES employees(employee_id),
    export_type export_type NOT NULL,
    export_format export_format NOT NULL,
    scope export_scope NOT NULL,
    directorate_id uuid REFERENCES directorates(directorate_id),
    period_start date,
    period_end date,
    filters_json jsonb NOT NULL DEFAULT '{}'::jsonb,
    status export_status NOT NULL DEFAULT 'pending',
    object_storage_key text,
    file_name varchar(255),
    content_type varchar(128),
    file_size_bytes bigint,
    error_code varchar(128),
    requested_at timestamptz NOT NULL DEFAULT now(),
    started_at timestamptz,
    completed_at timestamptz,
    expires_at timestamptz,
    CHECK (period_end IS NULL OR period_start IS NULL OR period_end>=period_start),
    CHECK ((scope='directorate' AND directorate_id IS NOT NULL) OR (scope='company' AND directorate_id IS NULL)),
    CHECK (file_size_bytes IS NULL OR file_size_bytes>=0),
    CHECK (jsonb_typeof(filters_json)='object')
);

CREATE TABLE audit_log (
    audit_id uuid PRIMARY KEY,
    actor_type audit_actor_type NOT NULL,
    actor_employee_id uuid REFERENCES employees(employee_id),
    action varchar(128) NOT NULL,
    entity_type varchar(128) NOT NULL,
    entity_id text NOT NULL,
    old_value jsonb,
    new_value jsonb,
    reason text,
    ip_device_metadata jsonb,
    correlation_id uuid,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK ((actor_type IN ('employee','admin') AND actor_employee_id IS NOT NULL) OR actor_type IN ('system','ai')),
    CHECK (old_value IS NULL OR jsonb_typeof(old_value)='object'),
    CHECK (new_value IS NULL OR jsonb_typeof(new_value)='object'),
    CHECK (ip_device_metadata IS NULL OR jsonb_typeof(ip_device_metadata)='object')
);

CREATE TABLE provider_call_attempts (
    provider_call_attempt_id uuid PRIMARY KEY,
    provider_kind provider_kind NOT NULL,
    provider_key varchar(128),
    operation varchar(128) NOT NULL,
    status provider_call_status NOT NULL,
    related_entity_type varchar(128),
    related_entity_id text,
    provider_request_id varchar(255),
    correlation_id uuid,
    request_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    response_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    error_code varchar(128),
    started_at timestamptz NOT NULL DEFAULT now(),
    finished_at timestamptz,
    CHECK (jsonb_typeof(request_metadata)='object'),
    CHECK (jsonb_typeof(response_metadata)='object')
);

CREATE TABLE outbox_events (
    event_id uuid PRIMARY KEY,
    event_type varchar(128) NOT NULL,
    event_version integer NOT NULL CHECK (event_version>=1),
    aggregate_type varchar(128) NOT NULL,
    aggregate_id text NOT NULL,
    aggregate_version integer,
    occurred_at timestamptz NOT NULL,
    business_date_spb date,
    actor_employee_id uuid REFERENCES employees(employee_id),
    correlation_id uuid NOT NULL,
    causation_id uuid,
    payload jsonb NOT NULL,
    published_at timestamptz,
    publish_attempts integer NOT NULL DEFAULT 0 CHECK (publish_attempts>=0),
    last_error text,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (jsonb_typeof(payload)='object')
);

CREATE TABLE processed_messages (
    consumer_name varchar(128) NOT NULL,
    event_id uuid NOT NULL,
    processed_at timestamptz NOT NULL DEFAULT now(),
    result_ref text,
    PRIMARY KEY (consumer_name, event_id)
);

CREATE TABLE api_idempotency_records (
    idempotency_record_id uuid PRIMARY KEY,
    scope_key varchar(255) NOT NULL,
    operation_key varchar(128) NOT NULL,
    idempotency_key varchar(255) NOT NULL,
    request_fingerprint varchar(128) NOT NULL,
    response_status integer,
    response_body jsonb,
    resource_type varchar(128),
    resource_id text,
    created_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz,
    UNIQUE (scope_key, operation_key, idempotency_key),
    CHECK (response_status IS NULL OR response_status BETWEEN 100 AND 599),
    CHECK (response_body IS NULL OR jsonb_typeof(response_body)='object')
);

CREATE TABLE scheduled_job_runs (
    scheduled_job_run_id uuid PRIMARY KEY,
    job_type varchar(128) NOT NULL,
    business_key varchar(255) NOT NULL,
    status scheduled_job_status NOT NULL DEFAULT 'pending',
    attempt_no integer NOT NULL DEFAULT 1 CHECK (attempt_no>=1),
    started_at timestamptz,
    completed_at timestamptz,
    error_code varchar(128),
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (job_type, business_key)
);

CREATE UNIQUE INDEX ux_employee_directorate_current ON employee_directorate_history(employee_id) WHERE valid_to IS NULL;
CREATE UNIQUE INDEX ux_directorate_director_current ON directorate_director_assignments(directorate_id) WHERE valid_to IS NULL;
CREATE UNIQUE INDEX ux_taxonomy_current ON taxonomy_versions(is_current) WHERE is_current=true;
CREATE INDEX ix_categories_version_active ON categories(taxonomy_version_id, active, name);
CREATE INDEX ix_subcategories_cat_active ON subcategories(taxonomy_version_id, category_id, active, name);
CREATE INDEX ix_ai_tools_active_name ON ai_tools(active, tool_name);
CREATE INDEX ix_capabilities_tool_valid ON tool_capabilities(tool_id, valid_from, valid_to);
CREATE INDEX ix_tasks_employee_date ON tasks(employee_id, registered_date_spb, status);
CREATE INDEX ix_tasks_directorate_date ON tasks(directorate_id_at_registration, registered_date_spb, status);
CREATE UNIQUE INDEX ux_task_versions_current ON task_versions(task_id) WHERE is_current=true;
CREATE INDEX ix_task_versions_assessed_complexity ON task_versions(version_state, complexity_level, created_at);
CREATE INDEX ix_task_versions_category ON task_versions(taxonomy_version_id, primary_category_id, subcategory_id);
CREATE INDEX ix_task_links_version ON task_links(task_version_id);
CREATE INDEX ix_task_tags_version_tag ON task_tags(task_version_id, tag);
CREATE INDEX ix_task_tools_version ON task_tools(task_version_id, is_primary);
CREATE INDEX ix_task_tools_tool ON task_tools(tool_id, task_version_id);
CREATE UNIQUE INDEX ux_task_tools_workflow_order ON task_tools(task_version_id, workflow_order) WHERE workflow_order IS NOT NULL;
CREATE INDEX ix_stt_runs_task ON stt_runs(task_version_id, status, created_at);
CREATE INDEX ix_ai_processing_task_status ON ai_processing_runs(task_version_id, status, run_no);
CREATE INDEX ix_task_clarifications_run_sequence ON task_clarifications(processing_run_id, sequence_no);
CREATE INDEX ix_scores_employee_date ON scores_ledger(employee_id, event_date_spb, created_at);
CREATE INDEX ix_scores_directorate_date ON scores_ledger(directorate_id_at_event, event_date_spb);
CREATE INDEX ix_scores_source ON scores_ledger(source_type, source_id);
CREATE INDEX ix_scores_reversal ON scores_ledger(reversal_of_ledger_id);
CREATE UNIQUE INDEX ux_scores_single_reversal ON scores_ledger(reversal_of_ledger_id) WHERE reversal_of_ledger_id IS NOT NULL;
CREATE INDEX ix_pet_events_employee_created ON pet_events(employee_id, created_at);
CREATE INDEX ix_daily_activity_date ON daily_activity(activity_date_spb, is_working_day);
CREATE INDEX ix_goal_cycles_employee_status ON monthly_goal_cycles(employee_id, status, month_start);
CREATE INDEX ix_goal_options_cycle ON goal_options(cycle_id, selected, option_no);
CREATE INDEX ix_goals_cycle_completed ON goals(cycle_id, completed);
CREATE INDEX ix_goal_matches_task_active ON goal_task_matches(task_version_id, active);
CREATE INDEX ix_streak_awards_employee ON streak_milestone_awards(employee_id, awarded_at);
CREATE INDEX ix_employee_achievements_earned ON employee_achievements(employee_id, earned_at);
CREATE INDEX ix_employee_cosmetics_earned ON employee_cosmetics(employee_id, earned_at);
CREATE INDEX ix_employee_rank_date ON employee_leaderboard_snapshots(snapshot_date, rank);
CREATE INDEX ix_directorate_rank_date ON directorate_leaderboard_snapshots(snapshot_date, rank);
CREATE INDEX ix_notifications_unread ON notifications(employee_id, created_at) WHERE read_at IS NULL;
CREATE INDEX ix_ambient_employee_date ON ambient_reactions(employee_id, business_date_spb);
CREATE INDEX ix_exports_requester_status ON export_requests(requested_by_employee_id, status, requested_at);
CREATE INDEX ix_audit_entity_created ON audit_log(entity_type, entity_id, created_at);
CREATE INDEX ix_audit_actor_created ON audit_log(actor_employee_id, created_at);
CREATE INDEX ix_provider_calls_related ON provider_call_attempts(provider_kind, related_entity_type, related_entity_id, started_at);
CREATE INDEX ix_provider_calls_correlation ON provider_call_attempts(correlation_id, started_at);
CREATE INDEX ix_outbox_unpublished ON outbox_events(created_at) WHERE published_at IS NULL;
CREATE INDEX ix_outbox_aggregate ON outbox_events(aggregate_type, aggregate_id, aggregate_version);
CREATE INDEX ix_idempotency_resource ON api_idempotency_records(resource_type, resource_id);
CREATE INDEX ix_scheduled_job_status ON scheduled_job_runs(status, job_type, created_at);
