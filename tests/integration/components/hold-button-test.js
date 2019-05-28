import { Promise } from 'rsvp';
import { registerAsyncHelper } from '@ember/test';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

registerAsyncHelper('sleep', function(app, duration) {
  return new Promise(function(resolve) {
    setTimeout(resolve, duration);
  });
});

module('Integration | Component | hold button', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    assert.expect(4);

    await render(hbs`{{hold-button delay=0 action='finished'}}`);
    let el = find('.ember-hold-button');
    assert.ok(el !== null);
    assert.ok(
      !el.classList.contains('is-holding'),
      'is-holding class not added'
    );
    assert.ok(
      !el.classList.contains('is-complete'),
      'is-complete class not added'
    );

    // Template block usage:
    await render(hbs`
      {{#hold-button}}
        template block text
      {{/hold-button}}
    `);

    assert.dom('*').hasText('template block text');
  });

  test('animation time set on inline style', async function(assert) {
    await render(hbs`{{hold-button delay=600 action='finished'}}`);
    let el = find('.ember-hold-button');

    let duration = el.style.transitionDuration;
    assert.equal(duration.indexOf('600ms'), 0);
  });

  test('it calls the action', async function(assert) {
    assert.expect(4);
    await render(hbs`{{hold-button delay=0 action='finished'}}`);
    let el = find('.ember-hold-button');

    let finished = false;
    this.actions.finished = function() {
      finished = true;
    };

    await triggerEvent(el, 'mousedown');

    assert.ok(el.classList.contains('is-holding'), 'is-holding class added');

    await triggerEvent(el, 'mouseup');

    assert.ok(
      !el.classList.contains('is-holding'),
      'is-holding class removed'
    );
    assert.ok(
      el.classList.contains('is-complete'),
      'is-complete class added'
    );
    assert.ok(finished, 'finished action called', 'finish called');
  });

  test('type reflects CSS class', async function(assert) {
    assert.expect(1);
    await render(hbs`{{hold-button delay=0 action='finished' type='banana'}}`);
    let el = find('.ember-hold-button');
    assert.ok(el.classList.contains('banana'), 'type class added');
  });

  test('extra params are returned with action', async function(assert) {
    assert.expect(1);
    this.actions.finished = params => {
      assert.equal(params, 'cheese');
    };
    await render(
      hbs`{{hold-button "cheese" delay=0 action='finished' type='banana'}}`
    );
    let el = find('.ember-hold-button');
    await triggerEvent(el, 'mousedown');
    await triggerEvent(el, 'mouseup');
  });

  test('touch events work correctly', async function(assert) {
    assert.expect(3);

    this.actions.finished = () => {
      assert.ok(true, 'Action triggered');
    };

    await render(hbs`{{hold-button delay=0 action='finished'}}`);

    let el = find('.ember-hold-button');
    await triggerEvent(el, 'touchstart');

    assert.ok(
      el.classList.contains('is-holding'),
      'Class added while holding'
    );

    await triggerEvent(el, 'touchend');

    assert.ok(
      el.classList.contains('is-complete'),
      'Class added when complete'
    );
  });
});
