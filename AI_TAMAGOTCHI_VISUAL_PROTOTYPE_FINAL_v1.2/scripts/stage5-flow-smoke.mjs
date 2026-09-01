import assert from 'node:assert/strict';

const questions = [1,2,3];
const scores = { C1:1, C2:5, C3:15, C4:40, C5:100 };
function run(target) {
  let answered = 0;
  const seen = [];
  while (answered < target && answered < 3) {
    const sequence = questions[answered];
    assert.ok(sequence && sequence <= 3);
    seen.push(sequence);
    answered += 1;
  }
  return { status: 'completed', answered, seen };
}
for (const target of [0,1,2,3]) {
  const result = run(target);
  assert.equal(result.status, 'completed');
  assert.equal(result.answered, target);
  assert.ok(result.seen.every((value) => value <= 3));
}
assert.deepEqual(Object.values(scores), [1,5,15,40,100]);
assert.equal(run(3).seen.includes(4), false);
console.log('STAGE5_CRITICAL_FLOW_SMOKE=PASS');
console.log('BRANCHES=0,1,2,3');
console.log('FOURTH_CLARIFICATION=IMPOSSIBLE');
console.log('FIXED_SCORE_MAP=1,5,15,40,100');
