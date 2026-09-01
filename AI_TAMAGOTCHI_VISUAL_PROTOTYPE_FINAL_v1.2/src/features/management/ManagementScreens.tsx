import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { RouteErrorState, RouteLoadingState } from '../../app/shell/RouteStates';
import { useDemoControlStore } from '../../demo-controls/store';
import { Button, Card, SelectField, TextField, Toggle } from '../../design-system';
import { PrototypeApiError } from '../../mock-api/client';
import type { DataScenario, DemoRole } from '../../mock-api/contracts';
import { DIRECTORATE_IDS } from '../employee-sections/fixtures';
import { managementApi } from './api';
import type { AdminEmployee, AppRole, ExportCreateRequest, TaxonomyVersion } from './contracts';
import styles from './ManagementScreens.module.css';

function ScenarioError({ error }: { error: unknown }) {
  if (error instanceof PrototypeApiError && error.status === 403) {
    return <section className={styles.state} role="alert"><span className={styles.eyebrow}>403 · RBAC / object scope</span><h1>Доступ запрещён</h1><p>Это controlled mock forbidden state. Production backend остаётся источником авторизации.</p></section>;
  }
  return <RouteErrorState />;
}

function useScenario(): DataScenario { return useDemoControlStore((state) => state.dataScenario); }
function useRole(): DemoRole { return useDemoControlStore((state) => state.role); }

function ScreenHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return <header className={styles.header}><div><span className={styles.eyebrow}>{eyebrow}</span><h1>{title}</h1></div>{action}</header>;
}
function Metric({ label, value }: { label: string; value: ReactNode }) { return <section className={styles.metric}><span>{label}</span><strong>{value}</strong></section>; }
function Empty({ title, body }: { title: string; body: string }) { return <Card><div className={styles.formCard}><strong>{title}</strong><p className={styles.subtle}>{body}</p></div></Card>; }
function statusClass(value: string) { return `${styles.status} ${value === 'active' || value === 'completed' ? styles.statusActive : value === 'blocked' || value === 'failed' ? styles.statusBlocked : ''}`; }

export function DirectorDashboardScreen() {
  const scenario = useScenario(); const [search, setSearch] = useState(''); const [periodFrom, setPeriodFrom] = useState('2026-08-01'); const [periodTo, setPeriodTo] = useState('2026-08-31');
  const dashboard = useQuery({ queryKey: ['stage7-director-dashboard', scenario, periodFrom, periodTo], enabled: scenario !== 'loading', queryFn: () => managementApi.directorDashboard(scenario, periodFrom, periodTo) });
  const employees = useQuery({ queryKey: ['stage7-director-employees', scenario, search], enabled: scenario !== 'loading', queryFn: () => managementApi.directorEmployees(scenario, search) });
  if (scenario === 'loading' || dashboard.isPending || employees.isPending) return <RouteLoadingState label="Загрузка Director Dashboard" />;
  if (dashboard.isError) return <ScenarioError error={dashboard.error} />; if (employees.isError) return <ScenarioError error={employees.error} />;
  const data = dashboard.data;
  return <div className={styles.page}><ScreenHead eyebrow="Own directorate only" title="Director Dashboard" action={<Link to="/exports">Экспорт дирекции</Link>} />
    <div className={styles.period}><TextField label="Период от" type="date" value={periodFrom} onChange={(e) => setPeriodFrom(e.target.value)} /><TextField label="Период до" type="date" value={periodTo} onChange={(e) => setPeriodTo(e.target.value)} /></div>
    <div className={styles.metrics}><Metric label="Авторизованных сотрудников" value={data.authorized_headcount} /><Metric label="Total Score" value={data.total_score} /><Metric label="Average Score" value={data.average_score.toFixed(1)} /><Metric label="Место дирекции" value={data.rank ?? '—'} /></div>
    <div className={styles.metrics}><Metric label="AI-кейсов" value={data.task_count} /><Metric label="Scope" value="Своя дирекция" /></div>
    <section className={styles.section}><div className={styles.sectionHead}><h2>Сотрудники</h2><TextField label="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ФИО" /></div>
      {employees.data.items.length ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Сотрудник</th><th>Роль</th><th>Статус</th><th>Дирекция</th></tr></thead><tbody>{employees.data.items.map((item) => <tr key={item.employee_id}><td><Link to={`/profiles/${item.employee_id}`}>{item.full_name}</Link></td><td>{item.role}</td><td><span className={statusClass(item.account_status)}>{item.account_status}</span></td><td><code>{item.directorate_id}</code></td></tr>)}</tbody></table></div> : <Empty title="Нет сотрудников" body="Для выбранных фильтров записи не найдены." />}
    </section><Card><p className={styles.subtle}>Director видит raw input/clarifications внутри своей дирекции через authorized drill-down, но technical scoring trace ему недоступен.</p></Card></div>;
}

export function ExecutiveDashboardScreen() {
  const scenario = useScenario(); const [periodFrom, setPeriodFrom] = useState('2026-08-01'); const [periodTo, setPeriodTo] = useState('2026-08-31');
  const query = useQuery({ queryKey: ['stage7-executive-dashboard', scenario, periodFrom, periodTo], enabled: scenario !== 'loading', queryFn: () => managementApi.executiveDashboard(scenario, periodFrom, periodTo) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка Executive Dashboard" />; if (query.isError) return <ScenarioError error={query.error} />;
  const data = query.data;
  return <div className={styles.page}><ScreenHead eyebrow="Whole company · read analytics" title="Executive Dashboard" action={<Link to="/exports">Экспорт компании</Link>} />
    <div className={styles.period}><TextField label="Период от" type="date" value={periodFrom} onChange={(e) => setPeriodFrom(e.target.value)} /><TextField label="Период до" type="date" value={periodTo} onChange={(e) => setPeriodTo(e.target.value)} /></div>
    <div className={styles.metrics}><Metric label="Авторизованных сотрудников" value={data.authorized_headcount} /><Metric label="AI-кейсов" value={data.task_count} /><Metric label="Средний Score / сотрудника" value={data.average_score_per_employee.toFixed(1)} /></div>
    <section className={styles.section}><h2>Дирекции</h2>{data.directorates.length ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Дирекция</th><th className={styles.numeric}>Rank</th><th className={styles.numeric}>Average</th><th className={styles.numeric}>Total</th><th className={styles.numeric}>Headcount</th></tr></thead><tbody>{data.directorates.map((d) => <tr key={d.directorate_id}><td><Link to={`/rating/directorates/${d.directorate_id}`}>{d.name}</Link></td><td className={styles.numeric}>{d.rank}</td><td className={styles.numeric}>{d.average_score.toFixed(1)}</td><td className={styles.numeric}>{d.total_score}</td><td className={styles.numeric}>{d.authorized_headcount}</td></tr>)}</tbody></table></div> : <Empty title="Нет данных" body="В выбранном периоде нет данных по дирекциям." />}</section>
    <Card><p className={styles.subtle}>Executive имеет company-wide drill-down, но не управляет пользователями, taxonomy, календарём или другими admin settings.</p></Card></div>;
}

const adminLinks = [
  ['/admin/users', 'Пользователи и роли', 'Роли, статусы, дирекции и скрытие профилей.'],
  ['/admin/org', 'Оргструктура', 'Дирекции, директоры и активность.'],
  ['/admin/calendar', 'Корпоративный календарь', 'Рабочие и нерабочие дни.'],
  ['/admin/taxonomy', 'Taxonomy', 'Версии, категории и подкатегории.'],
  ['/admin/tools', 'AI Tools Directory', 'Canonical tools, aliases и unrecognized queue.'],
  ['/admin/audit', 'Audit / Technical Trace', 'Audit log и admin-only scoring trace.'],
  ['/exports', 'Экспорт', 'Task/current/audit/aggregate CSV/XLSX.'],
] as const;

export function AdminPanelScreen() {
  return <div className={styles.page}><ScreenHead eyebrow="Admin shell" title="Admin Panel" /><p className={styles.subtle}>Навигационный shell без собственного business dataset — согласно screen contract.</p><div className={styles.cards}>{adminLinks.map(([to,title,body]) => <Link className={styles.linkCard} key={to} to={to}><strong>{title}</strong><span>{body}</span></Link>)}</div><Card tone="secondary"><p className={styles.subtle}>Admin не может вручную менять Complexity или Score AI-кейса. В интерфейсе такого control нет.</p></Card></div>;
}

export function AdminUsersScreen() {
  const scenario = useScenario(); const qc = useQueryClient(); const [search, setSearch] = useState(''); const [selectedId, setSelectedId] = useState(''); const [role, setRole] = useState<AppRole>('employee');
  const query = useQuery({ queryKey: ['stage7-admin-users', scenario, search], enabled: scenario !== 'loading', queryFn: () => managementApi.adminEmployees(scenario, search) });
  const update = useMutation({ mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof managementApi.updateAdminEmployee>[1] }) => managementApi.updateAdminEmployee(id, patch), onSuccess: async () => qc.invalidateQueries({ queryKey: ['stage7-admin-users'] }) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка пользователей" />; if (query.isError) return <ScenarioError error={query.error} />;
  const selected = query.data.items.find((x) => x.employee_id === selectedId) ?? null;
  return <div className={styles.page}><ScreenHead eyebrow="Whole company admin" title="Пользователи и роли" /><div className={styles.toolbar}><TextField label="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ФИО или табельный номер" /><span /><span /></div>
    {query.data.items.length ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Сотрудник</th><th>Табельный №</th><th>Роль</th><th>Статус</th><th>Профиль</th><th /></tr></thead><tbody>{query.data.items.map((u) => <tr key={u.employee_id}><td>{u.full_name}</td><td>{u.personnel_number}</td><td>{u.role}</td><td><span className={statusClass(u.account_status)}>{u.account_status}</span></td><td>{u.profile_hidden ? 'Скрыт' : 'Виден'}</td><td><Button variant="tertiary" onClick={() => { setSelectedId(u.employee_id); setRole(u.role); }}>Изменить</Button></td></tr>)}</tbody></table></div> : <Empty title="Нет пользователей" body="Список пуст для текущего mock state." />}
    {selected ? <Card title={`Изменение: ${selected.full_name}`}><div className={styles.formGrid}><SelectField label="Системная роль" value={role} onChange={(e) => setRole(e.target.value as AppRole)}>{['employee','director','executive','admin'].map((r) => <option key={r}>{r}</option>)}</SelectField><Toggle label="Профиль скрыт" checked={selected.profile_hidden} onChange={(e) => update.mutate({ id: selected.employee_id, patch: { profile_hidden: e.target.checked } })} /><SelectField label="Статус" value={selected.account_status} onChange={(e) => update.mutate({ id: selected.employee_id, patch: { account_status: e.target.value as AdminEmployee['account_status'] } })}><option>active</option><option>blocked</option><option>terminated</option></SelectField></div><div className={styles.actions}><Button loading={update.isPending} onClick={() => update.mutate({ id: selected.employee_id, patch: { role } })}>Сохранить роль</Button><Button variant="tertiary" onClick={() => setSelectedId('')}>Закрыть</Button></div>{update.isError ? <p className={styles.errorText}>Не удалось сохранить controlled mock mutation.</p> : null}</Card> : null}
    <Card tone="secondary"><p className={styles.subtle}>В AdminEmployeePatch отсутствуют поля Complexity и Score — ручного override нет.</p></Card></div>;
}

export function AdminOrgScreen() {
  const scenario = useScenario(); const qc = useQueryClient(); const [name, setName] = useState('');
  const query = useQuery({ queryKey: ['stage7-admin-org', scenario], enabled: scenario !== 'loading', queryFn: () => managementApi.adminDirectorates(scenario) });
  const create = useMutation({ mutationFn: () => managementApi.createDirectorate(name.trim()), onSuccess: async () => { setName(''); await qc.invalidateQueries({ queryKey: ['stage7-admin-org'] }); } });
  const update = useMutation({ mutationFn: ({ id, active }: { id: string; active: boolean }) => managementApi.updateDirectorate(id, { active }), onSuccess: async () => qc.invalidateQueries({ queryKey: ['stage7-admin-org'] }) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка оргструктуры" />; if (query.isError) return <ScenarioError error={query.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Admin" title="Оргструктура" /><Card title="Создать дирекцию"><div className={styles.formGrid}><TextField label="Название" value={name} onChange={(e) => setName(e.target.value)} error={!name && create.isError ? 'Название обязательно' : undefined} /><Button disabled={!name.trim()} loading={create.isPending} onClick={() => create.mutate()}>Создать</Button></div></Card>
    {query.data.items.length ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Дирекция</th><th>Директор</th><th>Активность</th><th /></tr></thead><tbody>{query.data.items.map((d) => <tr key={d.directorate_id}><td>{d.name}</td><td><code>{d.director_employee_id ?? 'не назначен'}</code></td><td><span className={statusClass(d.active ? 'active' : 'retired')}>{d.active ? 'active' : 'inactive'}</span></td><td><Button variant="tertiary" loading={update.isPending} onClick={() => update.mutate({ id: d.directorate_id, active: !d.active })}>{d.active ? 'Деактивировать' : 'Активировать'}</Button></td></tr>)}</tbody></table></div> : <Empty title="Нет дирекций" body="Оргструктура пуста." />}</div>;
}

export function AdminCalendarScreen() {
  const scenario = useScenario(); const qc = useQueryClient(); const query = useQuery({ queryKey: ['stage7-admin-calendar', scenario], enabled: scenario !== 'loading', queryFn: () => managementApi.calendar(scenario) });
  const update = useMutation({ mutationFn: (day: { date: string; is_working_day: boolean }) => managementApi.setCalendarDay(day.date, !day.is_working_day, day.is_working_day ? 'Manual non-working day · DEMO' : 'Manual working day · DEMO'), onSuccess: async () => qc.invalidateQueries({ queryKey: ['stage7-admin-calendar'] }) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка корпоративного календаря" />; if (query.isError) return <ScenarioError error={query.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Europe/Moscow / Санкт-Петербург" title="Корпоративный календарь" />{query.data.items.length ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Дата</th><th>Тип дня</th><th>Причина</th><th /></tr></thead><tbody>{query.data.items.map((d) => <tr key={d.date}><td>{d.date}</td><td><span className={statusClass(d.is_working_day ? 'active' : 'retired')}>{d.is_working_day ? 'Рабочий' : 'Нерабочий'}</span></td><td>{d.reason}</td><td><Button variant="tertiary" onClick={() => update.mutate(d)}>{d.is_working_day ? 'Сделать нерабочим' : 'Сделать рабочим'}</Button></td></tr>)}</tbody></table></div> : <Empty title="Нет календарных дней" body="Для периода нет записей." />}</div>;
}

function TaxonomyVersionCard({ version, onActivate, onToggleCategory, onToggleSubcategory }: { version: TaxonomyVersion; onActivate: () => void; onToggleCategory: (id: string, active: boolean) => void; onToggleSubcategory: (id: string, active: boolean) => void }) {
  return <Card title={`${version.version_code} · ${version.status}`}><div className={styles.tree}>{version.categories.map((c) => <div className={styles.treeRow} key={c.category_id}><div><strong>{c.name}</strong><div className={styles.actions}><span className={statusClass(c.active ? 'active' : 'retired')}>{c.active ? 'active' : 'inactive'}</span>{version.status === 'draft' ? <Button variant="tertiary" onClick={() => onToggleCategory(c.category_id, !c.active)}>{c.active ? 'Деактивировать' : 'Активировать'}</Button> : null}</div></div><div className={styles.sublist}>{version.subcategories.filter((sub) => sub.category_id === c.category_id).map((sub) => <span key={sub.subcategory_id}>— {sub.name} · {sub.active ? 'active' : 'inactive'} {version.status === 'draft' ? <button className={styles.mutedAction} type="button" onClick={() => onToggleSubcategory(sub.subcategory_id, !sub.active)}>изменить статус</button> : null}</span>)}</div></div>)}</div>{version.status === 'draft' ? <div className={styles.actions}><Button variant="secondary" onClick={onActivate}>Активировать версию</Button></div> : null}</Card>;
}

export function AdminTaxonomyScreen() {
  const scenario = useScenario(); const qc = useQueryClient(); const [versionCode, setVersionCode] = useState(''); const [categoryName, setCategoryName] = useState(''); const [subcategoryName, setSubcategoryName] = useState(''); const [categoryId, setCategoryId] = useState('');
  const query = useQuery({ queryKey: ['stage7-admin-taxonomy', scenario], enabled: scenario !== 'loading', queryFn: () => managementApi.taxonomyVersions(scenario) });
  const create = useMutation({ mutationFn: () => managementApi.createTaxonomyVersion(versionCode.trim()), onSuccess: async () => { setVersionCode(''); await qc.invalidateQueries({ queryKey: ['stage7-admin-taxonomy'] }); } });
  const activate = useMutation({ mutationFn: (id: string) => managementApi.activateTaxonomyVersion(id), onSuccess: async () => qc.invalidateQueries({ queryKey: ['stage7-admin-taxonomy'] }) });
  const draft = query.data?.items.find((x) => x.status === 'draft') ?? null;
  const addCategory = useMutation({ mutationFn: () => managementApi.createTaxonomyCategory(draft!.taxonomy_version_id, categoryName.trim()), onSuccess: async (created) => { setCategoryName(''); setCategoryId(created.category_id); await qc.invalidateQueries({ queryKey: ['stage7-admin-taxonomy'] }); } });
  const addSubcategory = useMutation({ mutationFn: () => managementApi.createTaxonomySubcategory(draft!.taxonomy_version_id, categoryId, subcategoryName.trim()), onSuccess: async () => { setSubcategoryName(''); await qc.invalidateQueries({ queryKey: ['stage7-admin-taxonomy'] }); } });
  const toggleCategory = useMutation({ mutationFn: ({ id, active }: { id: string; active: boolean }) => managementApi.updateTaxonomyCategory(draft!.taxonomy_version_id, id, { active }), onSuccess: async () => qc.invalidateQueries({ queryKey: ['stage7-admin-taxonomy'] }) });
  const toggleSubcategory = useMutation({ mutationFn: ({ id, active }: { id: string; active: boolean }) => managementApi.updateTaxonomySubcategory(draft!.taxonomy_version_id, id, { active }), onSuccess: async () => qc.invalidateQueries({ queryKey: ['stage7-admin-taxonomy'] }) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка taxonomy" />; if (query.isError) return <ScenarioError error={query.error} />;
  const draftCategories = draft?.categories ?? [];
  return <div className={styles.page}><ScreenHead eyebrow="Versioned taxonomy" title="Taxonomy" /><div className={styles.formGrid}><TextField label="Новая версия" value={versionCode} onChange={(e) => setVersionCode(e.target.value)} placeholder="1.2-draft" /><Button disabled={!versionCode.trim()} loading={create.isPending} onClick={() => create.mutate()}>Создать draft</Button>{draft ? <><TextField label="Категория в draft" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} /><Button disabled={!categoryName.trim()} loading={addCategory.isPending} onClick={() => addCategory.mutate()}>Добавить категорию</Button><SelectField label="Родительская категория" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}><option value="">Выберите</option>{draftCategories.map((c) => <option key={c.category_id} value={c.category_id}>{c.name}</option>)}</SelectField><TextField label="Новая подкатегория" value={subcategoryName} onChange={(e) => setSubcategoryName(e.target.value)} /><Button disabled={!categoryId || !subcategoryName.trim()} loading={addSubcategory.isPending} onClick={() => addSubcategory.mutate()}>Добавить подкатегорию</Button></> : null}</div><div className={styles.cards}>{query.data.items.map((v) => <TaxonomyVersionCard key={v.taxonomy_version_id} version={v} onActivate={() => activate.mutate(v.taxonomy_version_id)} onToggleCategory={(id, active) => toggleCategory.mutate({ id, active })} onToggleSubcategory={(id, active) => toggleSubcategory.mutate({ id, active })} />)}</div><Card tone="secondary"><p className={styles.subtle}>Изменение taxonomy не ретро-переклассифицирует старые AI-кейсы.</p></Card></div>;
}

export function AdminToolsScreen() {
  const scenario = useScenario(); const qc = useQueryClient(); const [search, setSearch] = useState(''); const [name, setName] = useState('');
  const tools = useQuery({ queryKey: ['stage7-admin-tools', scenario, search], enabled: scenario !== 'loading', queryFn: () => managementApi.tools(scenario, search) });
  const unknown = useQuery({ queryKey: ['stage7-unrecognized-tools', scenario], enabled: scenario !== 'loading', queryFn: () => managementApi.unrecognizedTools(scenario) });
  const create = useMutation({ mutationFn: () => managementApi.createTool({ tool_name: name.trim() }), onSuccess: async () => { setName(''); await qc.invalidateQueries({ queryKey: ['stage7-admin-tools'] }); } });
  const update = useMutation({ mutationFn: ({ id, active }: { id: string; active: boolean }) => managementApi.updateTool(id, { active }), onSuccess: async () => qc.invalidateQueries({ queryKey: ['stage7-admin-tools'] }) });
  if (scenario === 'loading' || tools.isPending || unknown.isPending) return <RouteLoadingState label="Загрузка AI Tools Directory" />; if (tools.isError) return <ScenarioError error={tools.error} />; if (unknown.isError) return <ScenarioError error={unknown.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Canonical directory" title="AI Tools Directory" /><div className={styles.toolbar}><TextField label="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} /><TextField label="Новый tool" value={name} onChange={(e) => setName(e.target.value)} /><Button disabled={!name.trim()} loading={create.isPending} onClick={() => create.mutate()}>Добавить</Button></div>
    <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Tool</th><th>Provider</th><th>Type</th><th>Aliases</th><th>Status</th><th /></tr></thead><tbody>{tools.data.items.map((t) => <tr key={t.tool_id}><td>{t.tool_name}</td><td>{t.provider ?? '—'}</td><td>{t.tool_type ?? '—'}</td><td>{t.aliases.join(', ') || '—'}</td><td>{t.active ? 'active' : 'inactive'}</td><td><Button variant="tertiary" onClick={() => update.mutate({ id: t.tool_id, active: !t.active })}>{t.active ? 'Деактивировать' : 'Активировать'}</Button></td></tr>)}</tbody></table></div>
    <section className={styles.section}><h2>Unrecognized tools</h2>{unknown.data.items.length ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Название</th><th>AI-кейсов</th><th>Последнее упоминание</th></tr></thead><tbody>{unknown.data.items.map((t) => <tr key={t.name}><td>{t.name}</td><td>{t.task_count}</td><td>{new Date(t.last_seen_at).toLocaleString('ru-RU')}</td></tr>)}</tbody></table></div> : <Empty title="Очередь пуста" body="Нераспознанных AI-инструментов нет." />}</section></div>;
}

export function AdminAuditScreen() {
  const scenario = useScenario(); const [taskId, setTaskId] = useState('50000000-0000-4000-8000-000000000001');
  const audit = useQuery({ queryKey: ['stage7-admin-audit', scenario], enabled: scenario !== 'loading', queryFn: () => managementApi.audit(scenario) });
  const trace = useQuery({ queryKey: ['stage7-scoring-trace', scenario, taskId], enabled: scenario !== 'loading' && Boolean(taskId), queryFn: () => managementApi.scoringTrace(taskId, scenario) });
  if (scenario === 'loading' || audit.isPending || trace.isPending) return <RouteLoadingState label="Загрузка audit / technical trace" />; if (audit.isError) return <ScenarioError error={audit.error} />; if (trace.isError) return <ScenarioError error={trace.error} />;
  return <div className={styles.page}><ScreenHead eyebrow="Admin only" title="Audit / Technical Trace" /><section className={styles.section}><h2>Audit log</h2>{audit.data.items.length ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Время</th><th>Actor</th><th>Action</th><th>Entity</th><th>Changes</th></tr></thead><tbody>{audit.data.items.map((e) => <tr key={e.audit_id}><td>{new Date(e.created_at).toLocaleString('ru-RU')}</td><td>{e.actor_type}</td><td>{e.action}</td><td>{e.entity_type}<br/><code>{e.entity_id}</code></td><td>{e.changes.map((c) => <span className={styles.auditChange} key={c.field}>{c.field}: {String(c.old_value)} → {String(c.new_value)}</span>)}</td></tr>)}</tbody></table></div> : <Empty title="Audit log пуст" body="События отсутствуют." />}</section>
    <Card title="Technical scoring trace"><TextField label="Task ID" value={taskId} onChange={(e) => setTaskId(e.target.value)} /><div className={styles.trace}><div><span>Complexity / Score</span><strong>{trace.data.complexity_level} · {trace.data.score}</strong></div><div><span>Clarifications</span><strong>{trace.data.clarification_count} / 3</strong></div><div><span>Provider</span><strong>{trace.data.model_provider}</strong></div><div><span>Model</span><strong>{trace.data.model_id}</strong></div><div><span>Prompt bundle</span><strong>{trace.data.prompt_bundle_version}</strong></div><div><span>Rubric / taxonomy</span><strong>{trace.data.scoring_rubric_version} / {trace.data.taxonomy_version_code}</strong></div></div><div className={styles.flags}>{trace.data.evidence_flags.map((f) => <span className={styles.flag} key={f}>{f}</span>)}</div><p className={styles.subtle}>Trace доступен только Admin и является read-only. Поля ручного изменения Score/Complexity отсутствуют.</p></Card></div>;
}

function exportRole(role: DemoRole): 'Director' | 'Executive' | 'Admin' { return role === 'Director' ? 'Director' : role === 'Executive' ? 'Executive' : 'Admin'; }
export function ExportScreen() {
  const scenario = useScenario(); const role = useRole(); const apiRole = exportRole(role); const [exportType, setExportType] = useState<ExportCreateRequest['export_type']>('aggregate'); const [format, setFormat] = useState<ExportCreateRequest['format']>('xlsx'); const defaultScope: ExportCreateRequest['scope_type'] = role === 'Director' ? 'directorate' : 'company'; const [scope, setScope] = useState<ExportCreateRequest['scope_type']>(defaultScope); const [acceptedId, setAcceptedId] = useState(''); const [download, setDownload] = useState('');
  const create = useMutation({ mutationFn: () => managementApi.createExport(apiRole, { export_type: exportType, format, scope_type: role === 'Director' ? 'directorate' : scope, directorate_id: role === 'Director' ? DIRECTORATE_IDS.commercial : scope === 'directorate' ? DIRECTORATE_IDS.commercial : null, period_from: '2026-08-01', period_to: '2026-08-31' }), onSuccess: (data) => setAcceptedId(data.export_id) });
  const status = useQuery({ queryKey: ['stage7-export-status', scenario, acceptedId], enabled: Boolean(acceptedId) && scenario !== 'loading', queryFn: () => managementApi.exportStatus(apiRole, acceptedId, scenario) });
  const canCompany = role === 'Executive' || role === 'Admin';
  return <div className={styles.page}><ScreenHead eyebrow="Role-derived export scope" title="Экспорт" /><Card title="Новый экспорт"><div className={styles.formGrid}><SelectField label="Тип" value={exportType} onChange={(e) => setExportType(e.target.value as ExportCreateRequest['export_type'])}><option value="task_current">task_current</option><option value="task_audit">task_audit</option><option value="aggregate">aggregate</option></SelectField><SelectField label="Формат" value={format} onChange={(e) => setFormat(e.target.value as ExportCreateRequest['format'])}><option value="xlsx">XLSX</option><option value="csv">CSV</option></SelectField><SelectField label="Scope" value={role === 'Director' ? 'directorate' : scope} disabled={!canCompany} onChange={(e) => setScope(e.target.value as ExportCreateRequest['scope_type'])}><option value="directorate">directorate</option>{canCompany ? <option value="company">company</option> : null}</SelectField></div><div className={styles.actions}><Button loading={create.isPending} onClick={() => create.mutate()}>Создать экспорт</Button></div>{role === 'Director' ? <p className={styles.subtle}>Director может экспортировать только свою дирекцию.</p> : null}{create.isError ? <p className={styles.errorText}>Экспорт не создан: controlled error/permission state.</p> : null}</Card>
    {acceptedId ? <Card title="Статус"><div className={styles.exportStatus} role="status" aria-live="polite">{scenario === 'loading' || status.isPending ? <p>queued / pending…</p> : status.isError ? <ScenarioError error={status.error} /> : <><span className={statusClass(status.data.status)}>{status.data.status}</span><p className={styles.subtle}>ID: {status.data.export_id} · {status.data.format.toUpperCase()}</p>{status.data.status === 'completed' ? <Button variant="secondary" onClick={async () => setDownload(await managementApi.downloadExport(apiRole, acceptedId))}>Скачать mock export</Button> : null}</>}</div>{download ? <pre className={styles.downloadPreview}>{download}</pre> : null}</Card> : null}</div>;
}

export function PrivilegedEmployeeDetail({ mode, employeeId, scenario }: { mode: 'director' | 'executive'; employeeId: string; scenario: DataScenario }) {
  const query = useQuery({ queryKey: ['stage7-management-employee', mode, employeeId, scenario], enabled: scenario !== 'loading', queryFn: () => mode === 'director' ? managementApi.directorEmployee(employeeId, scenario) : managementApi.executiveEmployee(employeeId, scenario) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка управленческого профиля сотрудника" />; if (query.isError) return <ScenarioError error={query.error} />;
  const d = query.data;
  return <div className={styles.page}><ScreenHead eyebrow={mode === 'director' ? 'Director drill-down · own directorate' : 'Executive drill-down · whole company'} title="Профиль сотрудника" /><div className={styles.metrics}><Metric label="Annual Score" value={d.annual_score} /><Metric label="Lifetime Task Score" value={d.lifetime_task_score} /><Metric label="Evolution XP" value={d.evolution_xp} /><Metric label="AI-кейсов" value={d.task_count} /><Metric label="AI-active days" value={d.active_days} /><Metric label="Current streak" value={d.current_streak} /></div><Card><p className={styles.subtle}>Privileged management projection. Technical scoring trace не отображается здесь.</p></Card></div>;
}

export function ExecutiveDirectorateDetail({ directorateId, scenario }: { directorateId: string; scenario: DataScenario }) {
  const query = useQuery({ queryKey: ['stage7-exec-directorate', directorateId, scenario], enabled: scenario !== 'loading', queryFn: () => managementApi.executiveDirectorate(directorateId, scenario) });
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка дирекции" />; if (query.isError) return <ScenarioError error={query.error} />;
  const d = query.data;
  return <div className={styles.page}><ScreenHead eyebrow="Executive drill-down" title="Дирекция" /><div className={styles.metrics}><Metric label="Headcount" value={d.authorized_headcount} /><Metric label="Total Score" value={d.total_score} /><Metric label="Average Score" value={d.average_score.toFixed(1)} /><Metric label="Rank" value={d.rank ?? '—'} /><Metric label="AI-кейсов" value={d.task_count} /></div><section className={styles.section}><h2>Сотрудники</h2><div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Сотрудник</th><th className={styles.numeric}>Annual Score</th><th className={styles.numeric}>Rank</th></tr></thead><tbody>{d.employees.map((e) => <tr key={e.employee_id}><td><Link to={`/profiles/${e.employee_id}`}>{e.full_name}</Link></td><td className={styles.numeric}>{e.annual_score}</td><td className={styles.numeric}>{e.rank}</td></tr>)}</tbody></table></div></section></div>;
}
