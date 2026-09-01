import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { Feedback } from '../components/Feedback';
import { TextArea, TextField } from '../components/Field';
import { PageContainer, ResponsiveGrid, Stack } from '../components/Layout';
import { ModalPreview } from '../components/Modal';
import { NavigationPreview } from '../components/NavigationPreview';
import { Checkbox, Radio, SelectField, Toggle } from '../components/SelectionControls';
import styles from './DesignSystemGallery.module.css';

const palette = [
  ['Background', '#F5F1E9'],
  ['Surface', '#FAF8F3'],
  ['Secondary', '#E9E1D5'],
  ['Graphite', '#292824'],
  ['Amber', '#D39A3C'],
  ['Amber dark', '#9E6E24'],
  ['Success', '#65816B'],
  ['Error', '#B95E56'],
] as const;

export function DesignSystemGallery() {
  const [selectedChip, setSelectedChip] = useState('C3');
  const [vacation, setVacation] = useState(false);

  return (
    <PageContainer>
      <main className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>PROTOTYPE STAGE 2 · COMPONENT GALLERY</p>
          <h1>Design System · Любознайка</h1>
          <p>Current Stage‑20 visual baseline. Компоненты ниже — reusable implementation, а не новый дизайн.</p>
        </header>

        <section className={styles.section} aria-labelledby="tokens-title">
          <div className={styles.sectionHeading}><h2 id="tokens-title">Foundations</h2><span>current handoff tokens</span></div>
          <div className={styles.swatches}>
            {palette.map(([name, value]) => <div key={name} className={styles.swatch}><i style={{ background: value }} /><span>{name}</span><code>{value}</code></div>)}
          </div>
          <div className={styles.typeSpec}>
            <span className={styles.display}>Display · 32 / 38</span>
            <span className={styles.h1}>H1 · 24 / 30</span>
            <span className={styles.h2}>H2 · 20 / 26</span>
            <span>Body · 16 / 23</span>
            <small>Caption · 12 / 16</small>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="buttons-title">
          <div className={styles.sectionHeading}><h2 id="buttons-title">Buttons</h2><span>default / hover / focus / pressed / disabled / loading</span></div>
          <div className={styles.row}>
            <Button>Добавить AI-задачу</Button>
            <Button variant="secondary">Подробнее</Button>
            <Button variant="tertiary">Отмена</Button>
            <Button variant="destructive">Удалить</Button>
            <Button disabled>Недоступно</Button>
            <Button loading>Загрузка</Button>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="inputs-title">
          <div className={styles.sectionHeading}><h2 id="inputs-title">Inputs & selection</h2><span>≥44×44 interactive target</span></div>
          <ResponsiveGrid>
            <TextField label="Название" placeholder="Введите значение" hint="Вспомогательный текст" />
            <TextField label="Поле с ошибкой" defaultValue="Некорректное значение" error="Проверьте введённые данные" />
            <TextArea rows={5} label="Описание AI-задачи" placeholder="Опишите уже выполненный AI-assisted work case" />
            <SelectField label="Категория" defaultValue="research">
              <option value="research">Research / поиск информации</option>
              <option value="data">Аналитика и работа с данными</option>
              <option value="docs">Работа с документами</option>
            </SelectField>
          </ResponsiveGrid>
          <div className={styles.selectionRow}>
            <Checkbox label="Показывать в выборке" defaultChecked />
            <Radio name="privacy-demo" label="Стандартный" defaultChecked />
            <Radio name="privacy-demo" label="Закрытый" />
            <Toggle label="В отпуске" checked={vacation} onChange={(event) => setVacation(event.currentTarget.checked)} />
          </div>
          <div className={styles.chipGroup}>
            <p className={styles.label}>Complexity filter</p>
            <div className={styles.row}>{['C1','C2','C3','C4','C5'].map((chip) => <Chip key={chip} selected={selectedChip === chip} onClick={() => setSelectedChip(chip)}>{chip}</Chip>)}</div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="cards-title">
          <div className={styles.sectionHeading}><h2 id="cards-title">Cards & feedback</h2><span>functional / restrained depth</span></div>
          <ResponsiveGrid>
            <Card title="Information Panel">Короткая агрегированная информация без декоративного game UI.</Card>
            <Card title="Monthly Goal" tone="secondary">2 из 3 задач с анализом данных выполнено.</Card>
            <Card title="Ошибка загрузки" tone="error">Данные не удалось получить. Предусмотрено действие retry.</Card>
          </ResponsiveGrid>
          <Stack className={styles.feedbackStack}>
            <Feedback kind="success" title="Готово" body="Изменения сохранены." />
            <Feedback kind="loading" title="Обработка" body="Состояние загрузки остаётся явно обозначенным." />
            <Feedback kind="error" title="Ошибка" body="Краткое функциональное сообщение без обязательного sad mascot." />
          </Stack>
        </section>

        <section className={styles.section} aria-labelledby="nav-title">
          <div className={styles.sectionHeading}><h2 id="nav-title">Navigation</h2><span>approved 4-tab mobile shell</span></div>
          <div className={styles.mobileFrame}>
            <NavigationPreview active="Рейтинг" />
            <p className={styles.assetNote}>Approved runtime SVG icons are intentionally not redrawn here: their binary bytes are unavailable in the current execution container.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="modal-title">
          <div className={styles.sectionHeading}><h2 id="modal-title">Modal</h2><span>blocking decision surface</span></div>
          <ModalPreview title="Подтвердить действие">Light functional surface, restrained shadow и явные действия.</ModalPreview>
        </section>

        <footer className={styles.footer}>Inter — Stage‑20 implementation baseline; при отсутствии используется system fallback. Final font license/family остаётся внешним production decision.</footer>
      </main>
    </PageContainer>
  );
}
