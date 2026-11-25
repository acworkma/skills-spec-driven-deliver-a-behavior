import test from 'node:test';
import assert from 'node:assert/strict';

import { canViewDependentClaim } from '../src/claim-visibility.js';
import { findDependentClaim, listDependentClaims } from '../src/claim-status.js';

const routineClaim = {
  id: 'SYN-ROUTINE',
  status: 'Processed',
  billed: 100,
  planPaid: 80,
  sensitive: false
};

const sensitiveClaim = {
  id: 'SYN-SENSITIVE',
  status: 'Denied',
  billed: 900,
  planPaid: 0,
  sensitive: true
};

function subscriberInput(dependent, claims) {
  return {
    authenticated: true,
    subscriber: true,
    dependent,
    claims
  };
}

test('001-US3-AS1: show routine adolescent claims and hide sensitive claims', () => {
  const dependent = { age: 16, confidential: false };

  assert.equal(canViewDependentClaim({ ...dependent, sensitive: false }), true);
  assert.equal(canViewDependentClaim({ ...dependent, sensitive: true }), false);
});

test('001-US3-AS2: hide claims when confidential status is unknown', () => {
  assert.equal(canViewDependentClaim({
    age: 9,
    confidential: undefined,
    sensitive: false
  }), false);
});

test('001-US3-AS3: confidential child list matches an empty claim list', () => {
  const confidential = subscriberInput(
    { age: 9, confidential: true },
    [routineClaim, sensitiveClaim]
  );
  const empty = subscriberInput(
    { age: 9, confidential: false },
    []
  );

  assert.deepEqual(listDependentClaims(confidential), listDependentClaims(empty));
});

test('001-US3-AS4: sensitive adolescent claim leaves the list response unchanged', () => {
  const withSensitiveClaim = subscriberInput(
    { age: 16, confidential: false },
    [routineClaim, sensitiveClaim]
  );
  const withoutSensitiveClaim = subscriberInput(
    { age: 16, confidential: false },
    [routineClaim]
  );

  assert.deepEqual(
    listDependentClaims(withSensitiveClaim),
    listDependentClaims(withoutSensitiveClaim)
  );
});

test('001-US3-AS5: adult list and privacy message are unchanged by claims', () => {
  const withClaims = subscriberInput(
    { age: 19, confidential: false },
    [routineClaim, sensitiveClaim]
  );
  const withoutClaims = subscriberInput(
    { age: 19, confidential: false },
    []
  );

  const response = listDependentClaims(withClaims);

  assert.deepEqual(response, listDependentClaims(withoutClaims));
  assert.equal(response.message, "Adult dependents' claims are private.");
});

test('001-US3-AS6: hidden claim lookup matches a missing claim lookup', () => {
  const input = subscriberInput(
    { age: 16, confidential: false },
    [routineClaim, sensitiveClaim]
  );

  const hiddenClaimResponse = findDependentClaim(input, sensitiveClaim.id);
  const missingClaimResponse = findDependentClaim(input, 'SYN-MISSING');

  assert.equal(hiddenClaimResponse.status, 404);
  assert.deepEqual(hiddenClaimResponse, missingClaimResponse);
});
