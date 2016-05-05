import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

Ember.Test.registerAsyncHelper('sleep', function(app, duration) {
  return new Ember.RSVP.Promise(function(resolve) {
    setTimeout(resolve, duration);
  });
});

moduleForComponent('hold-button', 'Integration | Component | hold button', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`{{hold-button delay=0 action='finished'}}`);
  let $component = this.$('.ember-hold-button');
  assert.equal($component.length, 1);
  assert.ok(!$component.hasClass('is-holding'), "is-holding class not added");
  assert.ok(!$component.hasClass('is-complete'), "is-complete class not added");

  // Template block usage:
  this.render(hbs`
    {{#hold-button}}
      template block text
    {{/hold-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('animation time set on inline style', function(assert) {
  this.render(hbs`{{hold-button delay=600 action='finished'}}`);
  let $span = this.$('.ember-hold-button > span');

  let duration = $span.css('transition-duration');
  assert.equal(duration.indexOf("0.6"), 0);
});

test('it calls the action', function(assert) {
  const done = assert.async();
  assert.expect(4);
  this.render(hbs`{{hold-button delay=0 action='finished'}}`);
  let $component = this.$('.ember-hold-button');

  let finished = false;
  this.on('finished', function() {
    finished = true;
  });

  $component.mousedown();
  Ember.run.later(() => {
    assert.ok($component.hasClass('is-holding'), "is-holding class added");
    $component.mouseup();

    Ember.run.later(() => {
      assert.ok(!$component.hasClass('is-holding'), "is-holding class removed");
      assert.ok($component.hasClass('is-complete'), "is-complete class added");
      assert.ok(finished, "finished action called", "finish called");
      done();
    });
  });
});

test('type reflects CSS class', function(assert) {
  assert.expect(1);
  this.render(hbs`{{hold-button delay=0 action='finished' type='banana'}}`);
  let $component = this.$('.ember-hold-button');
  assert.ok($component.hasClass('banana'), "type class added");
});

test('extra params are returned with action', function(assert) {
  assert.expect(1);
  this.on('finished', (params) => {
    assert.equal(params, "cheese");
  });
  this.render(hbs`{{hold-button "cheese" delay=0 action='finished' type='banana'}}`);
  let $component = this.$('.ember-hold-button');
  $component.mousedown();

  Ember.run.later(() => {
    $component.mouseup();
  });
});

test('touch events work correctly', function(assert) {
  const done = assert.async();
  assert.expect(3);
  this.on('finished', () => {
    assert.ok(true, "Action triggered");
  });

  this.render(hbs`{{hold-button delay=0 action='finished'}}`);
  let $component = this.$('.ember-hold-button');
  $component.trigger("touchstart");

  Ember.run.next(() => {
    assert.ok($component.hasClass('is-holding'), "Class added while holding");
    $component.trigger("touchend");

    Ember.run.next(() => {
      assert.ok($component.hasClass('is-complete'), "Class added when complete");
      done();
    });
  });
});
