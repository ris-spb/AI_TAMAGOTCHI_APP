import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDemoControlStore } from '../../demo-controls/store';
import { Button, Card, Radio, SelectField, TextArea, TextField, Toggle } from '../../design-system';
import { PrototypeApiError } from '../../mock-api/client';
import type { DataScenario } from '../../mock-api/contracts';
import { RouteErrorState, RouteLoadingState } from '../../app/shell/RouteStates';
import { demoRoleToAppRole } from '../../app/roleAdapter';
import { ExecutiveDirectorateDetail, PrivilegedEmployeeDetail } from '../management/ManagementScreens';
import { employeeApi } from './api';
import { DIRECTORATE_IDS, SELF_EMPLOYEE_ID } from './fixtures';
import type { GoalCycle, PublicProfile, TaskSummary } from './contracts';
import styles from './EmployeeSections.module.css';

const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value));
}

function ScenarioError({ error }: { error: unknown }) {
  if (error instanceof PrototypeApiError && error.status === 403) {
    return <section className={styles.state} role="alert"><span className={styles.eyebrow}>403 · Доступ ограничен</span><h1>Данные недоступны</h1><p>Mock API демонстрирует object/RBAC forbidden state. Frontend не является источником авторизации.</p></section>;
  }
  return <RouteErrorState />;
}

function useStage6Scenario(): DataScenario {
  return useDemoControlStore((state) => state.dataScenario);
}

function ScreenHead({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <header className={styles.header}><div>{eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}<h1>{title}</h1></div>{action}</header>;
}

function SegmentedNav({ active }: { active: 'tasks' | 'events' }) {
  return <nav className={styles.segmented} aria-label="Раздел истории"><Link className={active === 'tasks' ? styles.segmentActive : ''} to="/history">Задачи</Link><Link className={active === 'events' ? styles.segmentActive : ''} to="/history/events">События</Link></nav>;
}

function RatingNav({ active }: { active: 'employees' | 'directorates' | 'analytics' }) {
  return <nav className={styles.segmented} aria-label="Раздел рейтинга"><Link className={active === 'employees' ? styles.segmentActive : ''} to="/rating">Сотрудники</Link><Link className={active === 'directorates' ? styles.segmentActive : ''} to="/rating/directorates">Дирекции</Link><Link className={active === 'analytics' ? styles.segmentActive : ''} to="/rating/analytics">Аналитика</Link></nav>;
}

function EmptySurface({ title, body }: { title: string; body: string }) {
  return <Card><div className={styles.empty}><strong>{title}</strong><p>{body}</p></div></Card>;
}

function ComplexityChip({ level, score }: { level: string | null; score: number | null }) {
  return <span className={styles.complexity}>{level ?? '—'}{score !== null ? <b>{score}</b> : null}</span>;
}

function TaskRow({ task }: { task: TaskSummary }) {
  return <Link className={styles.listRow} to={`/ai-cases/${task.task_id}`}><div className={styles.rowBody}><strong>{task.normalized_description ?? 'AI-кейс обрабатывается'}</strong><span>{formatDateTime(task.registered_at)} · {task.tools.map((tool) => tool.name).join(', ') || 'Инструмент не указан'}</span></div><ComplexityChip level={task.complexity_level} score={task.score} /></Link>;
}

export function HistoryTasksScreen() {
  const scenario = useStage6Scenario();
  const [search, setSearch] = useState('');
  const [complexity, setComplexity] = useState('all');
  const query = useQuery({ queryKey: ['stage6-history-tasks', scenario, search, complexity], enabled: scenario !== 'loading', queryFn: () => employeeApi.historyTasks(scenario, search, complexity === 'all' ? '' : complexity) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка истории AI-кейсов" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  const items = query.data.items;
  return <div className={styles.page}><ScreenHead eyebrow="AI Activity Library" title="История" /><SegmentedNav active="tasks" /><div className={styles.toolbar}><TextField label="Поиск" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Описание AI-кейса" /><SelectField label="Complexity" value={complexity} onChange={(event) => setComplexity(event.target.value)}><option value="all">Все уровни</option>{['C1','C2','C3','C4','C5'].map((level) => <option value={level} key={level}>{level}</option>)}</SelectField></div>{items.length ? <div className={styles.list}>{items.map((task) => <TaskRow key={task.task_id} task={task} />)}</div> : <EmptySurface title="AI-кейсы не найдены" body="Измените фильтры или добавьте выполненный AI-кейс." />}</div>;
}

export function HistoryEventsScreen() {
  const scenario = useStage6Scenario();
  const query = useQuery({ queryKey: ['stage6-history-events', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.historyEvents(scenario) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка событий" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Progress events" title="История" /><SegmentedNav active="events" />{query.data.items.length ? <div className={styles.timeline}>{query.data.items.map((event) => <article className={styles.event} key={event.event_id}><span className={styles.eventDate}>{formatDate(event.event_date_spb)}</span><strong>{event.title}</strong></article>)}</div> : <EmptySurface title="Событий пока нет" body="Здесь появятся значимые Score/XP, goals, streak, evolution и другие progress events — без ежедневного HP-шума." />}</div>;
}

export function TaskDetailScreen() {
  const scenario = useStage6Scenario();
  const { taskId = '' } = useParams();
  const navigate = useNavigate();
  const client = useQueryClient();
  const [deleteArmed, setDeleteArmed] = useState(false);
  const detail = useQuery({ queryKey: ['stage6-task-detail', taskId, scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.taskDetail(taskId, scenario) });
  const versions = useQuery({ queryKey: ['stage6-task-versions', taskId, scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.taskVersions(taskId, scenario) });
  const deletion = useMutation({ mutationFn: () => employeeApi.deleteTask(taskId, `prototype-stage6-delete-${taskId}`), onSuccess: async () => { await client.invalidateQueries({ queryKey: ['stage6-history-tasks'] }); navigate('/history'); } });
  if (scenario === 'loading' || detail.isPending || versions.isPending) return <RouteLoadingState label="Загрузка AI-кейса" />;
  if (detail.isError) return <ScenarioError error={detail.error} />;
  if (versions.isError) return <ScenarioError error={versions.error} />;
  const current = detail.data.current_version;
  return <div className={styles.page}><ScreenHead eyebrow="AI-кейс" title="Детали" action={<Link className={styles.textAction} to={`/ai-cases/${taskId}/edit`}>Редактировать</Link>} /><Card><div className={styles.detailLead}><ComplexityChip level={current.complexity_level} score={current.score} /><strong>{current.normalized_description}</strong><span>{formatDateTime(detail.data.task.registered_at)}</span></div></Card><Card title="Исходное описание"><p className={styles.raw}>{current.raw_input}</p></Card><Card title="Инструменты и теги"><div className={styles.tagRow}>{detail.data.task.tools.map((tool) => <span className={styles.tag} key={tool.name}>{tool.name}</span>)}{detail.data.tags.map((tag) => <span className={styles.tag} key={tag}>{tag}</span>)}</div></Card>{detail.data.links.length ? <Card title="Ссылки"><div className={styles.linkStrings}>{detail.data.links.map((link) => <code key={link}>{link}</code>)}</div><p className={styles.note}>Ссылки хранятся как строки; prototype backend их не открывает и не анализирует.</p></Card> : null}<section className={styles.section}><h2>Версии</h2><div className={styles.versionList}>{[...versions.data.items].sort((a, b) => b.version_no - a.version_no).map((version) => <article className={styles.version} key={version.task_version_id}><div><strong>Версия {version.version_no}{version.version_no === current.version_no ? ' · текущая' : ''}</strong><span>{formatDateTime(version.created_at)} · {version.input_channel === 'voice' ? 'голос' : 'текст'}</span></div><ComplexityChip level={version.complexity_level} score={version.score} /><p>{version.normalized_description}</p></article>)}</div></section><Card title="Удаление"><p className={styles.note}>Удаление — только soft delete: версии и audit trail сохраняются, а кейс исчезает из обычной истории и текущих расчётов.</p>{deleteArmed ? <div className={styles.actionRow}><Button variant="tertiary" onClick={() => setDeleteArmed(false)}>Отмена</Button><Button variant="destructive" loading={deletion.isPending} onClick={() => deletion.mutate()}>Подтвердить удаление</Button></div> : <Button variant="destructive" onClick={() => setDeleteArmed(true)}>Удалить AI-кейс</Button>}{deletion.isError ? <p className={styles.errorText}>Не удалось удалить AI-кейс. Повторите действие.</p> : null}</Card></div>;
}

export function EditAiCaseScreen() {
  const scenario = useStage6Scenario();
  const { taskId = '' } = useParams();
  const navigate = useNavigate();
  const detail = useQuery({ queryKey: ['stage6-task-detail', taskId, scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.taskDetail(taskId, scenario) });
  const [draft, setDraft] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: (rawInput: string) => employeeApi.editTask(taskId, { expected_version_no: detail.data?.current_version.version_no ?? 1, raw_input: rawInput, input_channel: detail.data?.current_version.input_channel ?? 'text', links: detail.data?.links ?? [] }, `prototype-stage6-edit-${taskId}`),
    onSuccess: (accepted) => navigate(`/ai-cases/${accepted.task_id}/processing`),
  });
  if (scenario === 'loading' || detail.isPending) return <RouteLoadingState label="Загрузка AI-кейса для редактирования" />;
  if (detail.isError) return <ScenarioError error={detail.error} />;
  const value = draft ?? detail.data.current_version.raw_input;
  const invalid = !value.trim();
  return <div className={styles.page}><ScreenHead eyebrow={`Версия ${detail.data.current_version.version_no}`} title="Редактировать AI-кейс" /><Card><TextArea label="Исходное описание" value={value} error={invalid ? 'Описание выполненной AI-задачи обязательно.' : undefined} onChange={(event) => setDraft(event.target.value)} rows={8} hint="Normalized Description, Complexity и Score напрямую не редактируются." /><div className={styles.actionRow}><Button variant="tertiary" onClick={() => navigate(`/ai-cases/${taskId}`)}>Отмена</Button><Button loading={mutation.isPending} disabled={invalid || mutation.isPending} onClick={() => mutation.mutate(value)}>Сохранить новую версию</Button></div>{mutation.isError ? <p className={styles.errorText}>{mutation.error instanceof PrototypeApiError && mutation.error.status === 409 ? 'Версия изменилась. Обновите AI-кейс и повторите.' : 'Не удалось сохранить новую версию.'}</p> : null}</Card><Card tone="secondary"><strong>Что произойдёт после сохранения</strong><p className={styles.raw}>Будет создана новая TaskVersion и запущен полный reprocess. Предыдущие версии сохраняются; Score/Complexity вручную не переносятся и не редактируются.</p></Card></div>;
}

function GoalCard({ goal }: { goal: GoalCycle['goals'][number] }) {
  const percent = goal.target_value > 0 ? Math.min(100, (goal.current_value / goal.target_value) * 100) : 0;
  return <article className={`${styles.goalCard} ${goal.completed ? styles.goalCompleted : ''}`}><div className={styles.goalHead}><strong>{goal.display_text}</strong><span>{goal.current_value} / {goal.target_value}</span></div><div className={styles.progress} role="progressbar" aria-label={goal.display_text} aria-valuemin={0} aria-valuemax={goal.target_value} aria-valuenow={goal.current_value}><span style={{ width: `${percent}%` }} /></div><small>{goal.source === 'system_assigned' ? 'Системная цель' : 'Выбранная цель'}{goal.completed ? ' · Выполнено' : ''}</small></article>;
}

export function GoalsScreen() {
  const scenario = useStage6Scenario();
  const current = useQuery({ queryKey: ['stage6-goals-current', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.goalsCurrent(scenario) });
  const history = useQuery({ queryKey: ['stage6-goals-history', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.goalsHistory(scenario) });
  if (scenario === 'loading' || current.isPending || history.isPending) return <RouteLoadingState label="Загрузка Monthly Goals" />;
  if (current.isError) return <ScenarioError error={current.error} />;
  if (history.isError) return <ScenarioError error={history.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Monthly AI Goals" title="Цели месяца" /><Card><div className={styles.cycleHead}><div><span className={styles.eyebrow}>{monthNames[current.data.month - 1] ?? 'месяц'} {current.data.year}</span><strong>{current.data.goals.filter((goal) => goal.completed).length} из {current.data.goals.length} выполнено</strong></div><span className={styles.statusBadge}>{current.data.status === 'active' ? 'Активны' : current.data.status}</span></div></Card>{current.data.goals.length ? <div className={styles.goalGrid}>{current.data.goals.map((goal) => <GoalCard key={goal.goal_id} goal={goal} />)}</div> : <EmptySurface title="Активных целей нет" body="При обязательном setup новый цикл формирует три цели по серверным правилам." />}<p className={styles.note}>Перевыполнение не даёт дополнительного бонуса. Отпуск не пересчитывает thresholds и не продлевает месяц.</p>{history.data.items.length ? <section className={styles.section}><h2>История целей</h2>{history.data.items.map((cycle) => <Card key={cycle.cycle_id}><strong>{monthNames[cycle.month - 1] ?? 'месяц'} {cycle.year}</strong><span className={styles.inlineMeta}>{cycle.goals.filter((goal) => goal.completed).length}/3 выполнено</span></Card>)}</section> : null}</div>;
}

export function RatingEmployeesScreen() {
  const scenario = useStage6Scenario();
  const [search, setSearch] = useState('');
  const [directorate, setDirectorate] = useState('all');
  const query = useQuery({ queryKey: ['stage6-rating-employees', scenario, search, directorate], enabled: scenario !== 'loading', queryFn: () => employeeApi.employeeRating(scenario, search, directorate === 'all' ? '' : directorate) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка рейтинга сотрудников" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Annual Score · текущий год" title="Рейтинг" /><RatingNav active="employees" /><div className={styles.toolbar}><TextField label="Найти сотрудника" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ФИО" /><SelectField label="Дирекция" value={directorate} onChange={(event) => setDirectorate(event.target.value)}><option value="all">Все дирекции</option><option value={DIRECTORATE_IDS.commercial}>Коммерческая дирекция</option><option value={DIRECTORATE_IDS.digital}>Цифровые решения</option><option value={DIRECTORATE_IDS.finance}>Финансы</option><option value={DIRECTORATE_IDS.operations}>Операционная дирекция</option></SelectField></div>{query.data.own_rank ? <Card tone="secondary"><div className={styles.ownRank}><span>Моё место</span><strong>#{query.data.own_rank}</strong></div></Card> : null}{query.data.items.length ? <ol className={styles.rankList}>{query.data.items.map((employee) => <li key={employee.employee_id} className={employee.employee_id === SELF_EMPLOYEE_ID ? styles.selfRank : ''}><Link to={`/profiles/${employee.employee_id}`}><span className={styles.rankNumber}>#{employee.rank}</span><strong>{employee.full_name}</strong><span className={styles.score}>{employee.annual_score}</span></Link></li>)}</ol> : <EmptySurface title="Ничего не найдено" body="Измените поисковый запрос." />}</div>;
}

export function RatingDirectoratesScreen() {
  const scenario = useStage6Scenario();
  const [sort, setSort] = useState('rank:asc');
  const query = useQuery({ queryKey: ['stage6-rating-directorates', scenario, sort], enabled: scenario !== 'loading', queryFn: () => employeeApi.directorateRating(scenario, sort) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка рейтинга дирекций" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Average Score" title="Рейтинг" /><RatingNav active="directorates" /><SelectField label="Сортировка" value={sort} onChange={(event) => setSort(event.target.value)}><option value="rank:asc">По месту</option><option value="average_score:desc">По Average Score</option><option value="total_score:desc">По Total Score</option><option value="name:asc">По названию</option></SelectField>{query.data.items.length ? <div className={styles.directorateList}>{query.data.items.map((item) => <Link className={styles.directorateCard} key={item.directorate_id} to={`/rating/directorates/${item.directorate_id}`}><span className={styles.rankNumber}>#{item.rank}</span><div><strong>{item.name}</strong><span>Average {item.average_score.toFixed(1)} · Total {item.total_score} · {item.authorized_headcount} сотрудников</span></div></Link>)}</div> : <EmptySurface title="Нет данных рейтинга" body="Дирекции появятся после серверного расчёта current-year ranking." />}</div>;
}

export function CompanyAnalyticsScreen() {
  const scenario = useStage6Scenario();
  const [period, setPeriod] = useState('current_month');
  const periodDates = period === 'previous_month' ? ['2026-08-01', '2026-08-31'] : period === 'current_year' ? ['2026-01-01', '2026-09-01'] : ['2026-09-01', '2026-09-30'];
  const query = useQuery({ queryKey: ['stage6-company-analytics', scenario, period], enabled: scenario !== 'loading', queryFn: () => employeeApi.companyAnalytics(scenario, periodDates[0]!, periodDates[1]!) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка аналитики компании" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  const data = query.data;
  return <div className={styles.page}><ScreenHead eyebrow="Анонимная аналитика компании" title="Рейтинг" /><RatingNav active="analytics" /><SelectField label="Период" value={period} onChange={(event) => setPeriod(event.target.value)}><option value="current_month">Текущий месяц</option><option value="previous_month">Предыдущий месяц</option><option value="current_year">Текущий год</option></SelectField><div className={styles.metrics}><Card><span>AI-кейсы</span><strong>{data.task_count}</strong></Card><Card><span>Активные сотрудники</span><strong>{data.active_employee_count}</strong></Card><Card><span>Авторизованы</span><strong>{data.authorized_headcount}</strong></Card><Card><span>Avg Score / сотрудник</span><strong>{data.average_score_per_employee.toFixed(1)}</strong></Card></div><section className={styles.section}><h2>Complexity</h2><div className={styles.barList}>{data.complexity_distribution.map((row) => <div key={row.level}><span>{row.level}</span><div className={styles.miniBar}><i style={{ width: `${data.task_count ? Math.round(row.count / data.task_count * 100) : 0}%` }} /></div><b>{row.count}</b></div>)}</div></section><div className={styles.twoColumn}><Card title="Top AI Tools">{data.top_tools.map((item) => <div className={styles.kv} key={item.name}><span>{item.name}</span><b>{item.task_count}</b></div>)}</Card><Card title="Top Categories">{data.top_categories.map((item) => <div className={styles.kv} key={item.name}><span>{item.name}</span><b>{item.task_count}</b></div>)}</Card></div><p className={styles.note}>Публичный dashboard показывает только company-wide aggregates: без разбивки по дирекциям и без идентификации сотрудников.</p></div>;
}

export function DirectorateCardScreen() {
  const scenario = useStage6Scenario();
  const role = demoRoleToAppRole(useDemoControlStore((state) => state.role));
  const { directorateId = DIRECTORATE_IDS.commercial } = useParams();
  if (role === 'executive') return <ExecutiveDirectorateDetail directorateId={directorateId} scenario={scenario} />;
  const query = useQuery({ queryKey: ['stage6-directorate-card', directorateId, scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.directorateCard(directorateId, scenario) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка карточки дирекции" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  const d = query.data.directorate;
  return <div className={styles.page}><ScreenHead eyebrow={`#${d.rank} в рейтинге`} title={d.name} /><div className={styles.metrics}><Card><span>Average Score</span><strong>{d.average_score.toFixed(1)}</strong></Card><Card><span>Total Score</span><strong>{d.total_score}</strong></Card><Card><span>Сотрудники</span><strong>{d.authorized_headcount}</strong></Card></div><section className={styles.section}><h2>Сотрудники дирекции</h2>{query.data.employees.length ? <div className={styles.list}>{query.data.employees.map((employee) => <Link className={styles.listRow} key={employee.employee_id} to={`/profiles/${employee.employee_id}`}><div className={styles.rowBody}><strong>{employee.full_name}</strong><span>#{employee.rank} в компании</span></div><b>{employee.annual_score}</b></Link>)}</div> : <EmptySurface title="Нет сотрудников в mock projection" body="Карточка поддерживает empty-state." />}</section></div>;
}

function PrivacyProjection({ profile }: { profile: PublicProfile }) {
  return <>{profile.privacy_level !== 'closed' ? <><div className={styles.metrics}><Card><span>AI-кейсы</span><strong>{profile.task_count ?? '—'}</strong></Card><Card><span>Streak</span><strong>{profile.current_streak ?? '—'}</strong></Card></div>{profile.tools.length ? <Card title="AI-инструменты"><div className={styles.tagRow}>{profile.tools.map((tool) => <span className={styles.tag} key={tool}>{tool}</span>)}</div></Card> : null}</> : null}{profile.privacy_level === 'open' && profile.open_cases.length ? <section className={styles.section}><h2>Открытые AI-кейсы</h2>{profile.open_cases.map((item) => <Card key={item.task_id}><div className={styles.detailLead}><ComplexityChip level={item.complexity_level} score={item.score} /><strong>{item.normalized_description}</strong><span>{item.tools.join(', ')}</span></div></Card>)}</section> : null}</>;
}

export function PublicProfileScreen() {
  const scenario = useStage6Scenario();
  const role = demoRoleToAppRole(useDemoControlStore((state) => state.role));
  const { employeeId = '' } = useParams();
  if (role === 'director') return <PrivilegedEmployeeDetail mode="director" employeeId={employeeId} scenario={scenario} />;
  if (role === 'executive') return <PrivilegedEmployeeDetail mode="executive" employeeId={employeeId} scenario={scenario} />;
  const query = useQuery({ queryKey: ['stage6-public-profile', employeeId, scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.publicProfile(employeeId, scenario) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка публичного профиля" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  const profile = query.data;
  return <div className={styles.page}><ScreenHead eyebrow={`Профиль · ${profile.privacy_level}`} title={profile.employee.full_name} /><Card><div className={styles.profileLead}><div><span>Место</span><strong>#{profile.employee.rank}</strong></div><div><span>Annual Score</span><strong>{profile.employee.annual_score}</strong></div></div></Card><PrivacyProjection profile={profile} /><p className={styles.note}>Raw input, clarifications и ссылки не отображаются коллегам при любом privacy level.</p></div>;
}

export function ProfileScreen() {
  const scenario = useStage6Scenario();
  const me = useQuery({ queryKey: ['stage6-me', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.me(scenario) });
  const dash = useQuery({ queryKey: ['stage6-dashboard', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.dashboard(scenario) });
  if (scenario === 'loading' || me.isPending || dash.isPending) return <RouteLoadingState label="Загрузка профиля" />;
  if (me.isError) return <ScenarioError error={me.error} />;
  if (dash.isError) return <ScenarioError error={dash.error} />;
  const data = dash.data;
  return <div className={styles.page}><ScreenHead eyebrow={me.data.user.directorate_name} title={me.data.user.full_name} /><div className={styles.metrics}><Card><span>Annual Score</span><strong>{data.annual_score}</strong></Card><Card><span>Evolution XP</span><strong>{data.evolution_xp}</strong></Card><Card><span>AI-кейсы</span><strong>{data.task_count}</strong></Card><Card><span>AI-active days</span><strong>{data.active_days}</strong></Card></div><Card title="Прогресс"><div className={styles.kv}><span>Lifetime Task Score</span><b>{data.lifetime_task_score}</b></div><div className={styles.kv}><span>Average Complexity</span><b>{data.average_complexity?.toFixed(1) ?? '—'}</b></div><div className={styles.kv}><span>Current / best streak</span><b>{data.current_streak} / {data.best_streak}</b></div><div className={styles.kv}><span>Стадия питомца</span><b>{data.pet.evolution_stage}</b></div></Card><nav className={styles.settingsList} aria-label="Настройки профиля"><Link to="/goals"><span>Monthly Goals</span><b>{data.current_goals.filter((goal) => goal.completed).length}/{data.current_goals.length}</b></Link><Link to="/profile/achievements"><span>Achievements / Collection</span><b>›</b></Link><Link to="/profile/privacy"><span>Приватность</span><b>{me.data.privacy_level}</b></Link><Link to="/profile/vacation"><span>В отпуске</span><b>{data.pet.in_vacation ? 'Да' : 'Нет'}</b></Link><Link to="/profile/scoring"><span>Как работает scoring</span><b>›</b></Link></nav></div>;
}

export function PrivacyScreen() {
  const scenario = useStage6Scenario();
  const client = useQueryClient();
  const me = useQuery({ queryKey: ['stage6-me', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.me(scenario) });
  const [selected, setSelected] = useState<'closed'|'standard'|'open' | null>(null);
  const mutation = useMutation({ mutationFn: employeeApi.updatePrivacy, onSuccess: () => void client.invalidateQueries({ queryKey: ['stage6-me'] }) });
  if (scenario === 'loading' || me.isPending) return <RouteLoadingState label="Загрузка настроек приватности" />;
  if (me.isError) return <ScenarioError error={me.error} />;
  const value = selected ?? me.data.privacy_level;
  return <div className={styles.page}><ScreenHead eyebrow="Peer visibility" title="Приватность" /><Card><fieldset className={styles.privacyOptions}><legend>Что видят коллеги</legend><Radio name="privacy" checked={value === 'closed'} onChange={() => setSelected('closed')} label={<><strong>Закрытый</strong><small>ФИО, rank, Annual Score, питомец и статусные награды.</small></>} /><Radio name="privacy" checked={value === 'standard'} onChange={() => setSelected('standard')} label={<><strong>Стандартный</strong><small>Плюс агрегаты: задачи, Complexity, streak, goals, achievements и tools.</small></>} /><Radio name="privacy" checked={value === 'open'} onChange={() => setSelected('open')} label={<><strong>Открытый</strong><small>Плюс история AI-кейсов: normalized description, tools, Complexity и score.</small></>} /></fieldset><Button loading={mutation.isPending} disabled={!selected || selected === me.data.privacy_level} onClick={() => mutation.mutate(value)}>Сохранить</Button>{mutation.isSuccess ? <p className={styles.success}>Изменение применено сразу.</p> : null}</Card><p className={styles.note}>Raw input, clarification log и ссылки никогда не становятся peer-visible. Privacy не ограничивает предусмотренный contract-доступ директора, ГД и администратора.</p></div>;
}

export function VacationScreen() {
  const scenario = useStage6Scenario();
  const dashboard = useQuery({ queryKey: ['stage6-dashboard', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.dashboard(scenario) });
  const [override, setOverride] = useState<boolean | null>(null);
  const mutation = useMutation({ mutationFn: (enabled: boolean) => employeeApi.setVacation(enabled, 'prototype-stage6-vacation-state-001'), onSuccess: (data) => setOverride(data.enabled) });
  if (scenario === 'loading' || dashboard.isPending) return <RouteLoadingState label="Загрузка отпуска" />;
  if (dashboard.isError) return <ScenarioError error={dashboard.error} />;
  const enabled = override ?? dashboard.data.pet.in_vacation;
  return <div className={styles.page}><ScreenHead eyebrow="Pet / Streak freeze" title="В отпуске" /><Card><Toggle checked={enabled} disabled={mutation.isPending} onChange={(event) => mutation.mutate(event.target.checked)} label={enabled ? 'Статус «В отпуске» включён' : 'Статус «В отпуске» выключен'} /><p className={styles.note}>Отпуск замораживает HP и streak, но не пересчитывает Monthly Goals.</p>{mutation.isPending ? <span className={styles.inlineMeta}>Обновление…</span> : null}</Card><Card title="Важно"><p className={styles.raw}>Статус нельзя включить задним числом. Уже закрытые дни не пересчитываются.</p></Card></div>;
}

export function AchievementsScreen() {
  const scenario = useStage6Scenario();
  const query = useQuery({ queryKey: ['stage6-achievements', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.achievements(scenario) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка коллекции" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Только полученные" title="Achievements" />{query.data.items.length ? <div className={styles.achievementGrid}>{query.data.items.map((item) => <Card key={item.achievement_id}><div className={styles.achievement}><span className={styles.achievementMark} aria-hidden="true" /><div><strong>{item.title}</strong><span>{formatDate(item.earned_at)}</span>{import.meta.env.DEV && item.code.startsWith('DEMO_CONTENT_PLACEHOLDER') ? <small>DEMO content placeholder — final catalog не зафиксирован.</small> : null}</div></div></Card>)}</div> : <EmptySurface title="Полученных достижений пока нет" body="Неполученные достижения заранее не показываются." />}</div>;
}

export function ScoringInfoScreen() {
  const scenario = useStage6Scenario();
  const query = useQuery({ queryKey: ['stage6-scoring', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.scoring(scenario) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка правил scoring" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Complexity C1–C5" title="Как работает scoring" /><div className={styles.scoringList}>{query.data.levels.map((level) => <Card key={level.level}><div className={styles.scoringRow}><ComplexityChip level={level.level} score={level.points} /><div><strong>{level.label}</strong><p>{level.description}</p></div></div></Card>)}</div><Card tone="secondary"><strong>До 3 уточнений</strong><p className={styles.raw}>Система задаёт вопросы только когда ответ может изменить корректность или классификацию. Ручного изменения Complexity/Score нет.</p></Card></div>;
}

export function NotificationsScreen() {
  const scenario = useStage6Scenario();
  const client = useQueryClient();
  const query = useQuery({ queryKey: ['stage6-notifications', scenario], enabled: scenario !== 'loading', queryFn: () => employeeApi.notifications(scenario) });
  const mutation = useMutation({ mutationFn: employeeApi.markNotificationRead, onSuccess: () => void client.invalidateQueries({ queryKey: ['stage6-notifications'] }) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка уведомлений" />;
  if (query.isError) return <ScenarioError error={query.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="In-app only" title="Уведомления" />{query.data.items.length ? <div className={styles.list}>{query.data.items.map((item) => <article className={`${styles.notification} ${item.read_at ? styles.read : ''}`} key={item.notification_id}><div><span className={styles.eyebrow}>{item.type}</span><strong>{item.title}</strong><p>{item.body}</p><small>{formatDateTime(item.created_at)}</small></div>{!item.read_at ? <Button variant="tertiary" onClick={() => mutation.mutate(item.notification_id)}>Прочитано</Button> : null}</article>)}</div> : <EmptySurface title="Новых уведомлений нет" body="В MVP используются только in-app notifications." />}</div>;
}
