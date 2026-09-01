import { create } from 'zustand';

import type { InputChannel, TaskCreateRequest } from './contracts';

export type AiCaseDraftState = {
  draftText: string;
  links: readonly string[];
  transcript: string;
  inputChannel: InputChannel;
  taskId: string | null;
  createRequest: TaskCreateRequest | null;
  runNo: number;
  taskIdempotencyKey: string;
  sttIdempotencyKey: string;
  setDraft: (draftText: string, links?: readonly string[]) => void;
  setTranscript: (transcript: string) => void;
  setInputChannel: (inputChannel: InputChannel) => void;
  setAcceptedTask: (taskId: string, request: TaskCreateRequest) => void;
  beginNewRun: () => void;
};

function taskKey(runNo: number) {
  return `prototype-stage5-task-run-${runNo}`;
}

function sttKey(runNo: number) {
  return `prototype-stage5-stt-run-${runNo}`;
}

export const useAiCaseFlowStore = create<AiCaseDraftState>((set) => ({
  draftText: '',
  links: [],
  transcript: '',
  inputChannel: 'text',
  taskId: null,
  createRequest: null,
  runNo: 1,
  taskIdempotencyKey: taskKey(1),
  sttIdempotencyKey: sttKey(1),
  setDraft: (draftText, links = []) => set({ draftText, links }),
  setTranscript: (transcript) => set({ transcript }),
  setInputChannel: (inputChannel) => set({ inputChannel }),
  setAcceptedTask: (taskId, createRequest) => set({ taskId, createRequest }),
  beginNewRun: () => set((state) => {
    const runNo = state.runNo + 1;
    return {
      draftText: '',
      links: [],
      transcript: '',
      inputChannel: 'text',
      taskId: null,
      createRequest: null,
      runNo,
      taskIdempotencyKey: taskKey(runNo),
      sttIdempotencyKey: sttKey(runNo),
    };
  }),
}));
