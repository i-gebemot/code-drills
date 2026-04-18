(function() {
  "use strict";
  function interceptCustomElements(wrapSvelteCustomElement2) {
    let alreadyIntercepting = !!window._$gbm$_latestWrapFn;
    window._$gbm$_latestWrapFn = wrapSvelteCustomElement2;
    if (alreadyIntercepting) {
      return;
    }
    let latests = /* @__PURE__ */ new Map();
    let defineCustomElement = customElements.define;
    customElements.define = (name, Ctor, opts) => {
      wrapSvelteCustomElement2 = window._$gbm$_latestWrapFn;
      let firstRegistration = !latests.has(name);
      let latest = wrapSvelteCustomElement2(name, Ctor);
      latests.set(name, latest);
      if (firstRegistration) {
        let proxy2 = new Proxy(latest.Ctor, {
          construct(target, args, newTarget) {
            let latest2 = latests.get(name);
            let latestPrototype = latest2.Ctor.prototype;
            let instance = Reflect.construct(latest2.Ctor, [latestPrototype], newTarget);
            console.log(`'${name}': constructed`, { instance, latestPrototype });
            return instance;
          }
        });
        defineCustomElement.call(customElements, name, proxy2, opts);
      }
    };
    console.log("Custom elements construction is being intercepted");
  }
  function wrapSvelteCustomElement(name, Ctor) {
    let Wrapper = class extends Ctor {
      CODE_BASE = 1;
      name;
      superPrototype;
      callSuper(me, method, ...arg) {
        let fn = me.superPrototype[method];
        return fn.apply(me, arg);
      }
      constructor(latestPrototype) {
        super();
        Object.setPrototypeOf(this, latestPrototype);
        this.name = name;
        this.superPrototype = Object.getPrototypeOf(latestPrototype);
      }
      addEventListener(type, listener, options) {
        let method = this.addEventListener.name;
        return this.callSuper(this, method, type, listener, options);
      }
      removeEventListener(type, listener, options) {
        let method = this.removeEventListener.name;
        return this.callSuper(this, method, type, listener, options);
      }
      connectedCallback() {
        let method = this.connectedCallback.name;
        return this.callSuper(this, method);
      }
      attributeChangedCallback(attr, _oldValue, newValue) {
        let method = this.attributeChangedCallback.name;
        return this.callSuper(this, method, attr, _oldValue, newValue);
      }
      disconnectedCallback() {
        let method = this.removeEventListener.name;
        return this.callSuper(this, method);
      }
    };
    return {
      Ctor: Wrapper
    };
  }
  (function() {
    let myPage3 = document.currentScript.getAttribute("nonce");
    console.log(`${myPage3}: gebemot is being initialized`);
    interceptCustomElements(wrapSvelteCustomElement);
  })();
  function addCss(host, href) {
    let style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = href;
    host.appendChild(style);
  }
  function addJs(host, href) {
    var js = document.createElement("script");
    js.src = href;
    host.appendChild(js);
  }
  function getMyShadowRoot(el) {
    let node = el;
    while (node) {
      const root2 = node.getRootNode();
      if (root2 instanceof ShadowRoot) {
        return root2;
      }
      node = node.parentNode;
    }
    return null;
  }
  const MY_DEPENDENCIES = "_$$gbmot_dependencies$$_";
  function addToMyRoot(el, libs) {
    let root2 = el === document.head ? el : getMyShadowRoot(el);
    if (root2 === null) return;
    let deps = root2[MY_DEPENDENCIES] || (root2[MY_DEPENDENCIES] = {});
    let loader = {
      "tailwind": () => addCss(root2, "https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css"),
      "daisy-ui": () => addCss(root2, "https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.min.css"),
      "google-fonts": () => addCss(root2, "https://fonts.googleapis.com/css2?family=Amatic+SC&family=Patrick+Hand&display=swap"),
      "jquery": () => addJs(root2, "https://code.jquery.com/jquery-3.6.0.min.js"),
      "mathjax": () => addJs(root2, "https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js")
    };
    libs.forEach((lib2) => {
      if (deps[lib2]) return;
      deps[lib2] = true;
      loader[lib2]();
    });
  }
  const EACH_ITEM_REACTIVE = 1;
  const EACH_INDEX_REACTIVE = 1 << 1;
  const EACH_IS_CONTROLLED = 1 << 2;
  const EACH_IS_ANIMATED = 1 << 3;
  const EACH_ITEM_IMMUTABLE = 1 << 4;
  const PROPS_IS_RUNES = 1 << 1;
  const PROPS_IS_UPDATED = 1 << 2;
  const PROPS_IS_BINDABLE = 1 << 3;
  const TEMPLATE_FRAGMENT = 1;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const HYDRATION_START = "[";
  const HYDRATION_START_ELSE = "[!";
  const HYDRATION_END = "]";
  const HYDRATION_ERROR = {};
  const UNINITIALIZED = Symbol();
  const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
  const DEV = false;
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var array_from = Array.from;
  var object_keys = Object.keys;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  var is_extensible = Object.isExtensible;
  function is_function(thing) {
    return typeof thing === "function";
  }
  const noop = () => {
  };
  function is_promise(value) {
    return typeof value?.then === "function";
  }
  function run(fn) {
    return fn();
  }
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }
  function deferred() {
    var resolve;
    var reject;
    var promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const BOUNDARY_EFFECT = 1 << 7;
  const UNOWNED = 1 << 8;
  const DISCONNECTED = 1 << 9;
  const CLEAN = 1 << 10;
  const DIRTY = 1 << 11;
  const MAYBE_DIRTY = 1 << 12;
  const INERT = 1 << 13;
  const DESTROYED = 1 << 14;
  const EFFECT_RAN = 1 << 15;
  const EFFECT_TRANSPARENT = 1 << 16;
  const INSPECT_EFFECT = 1 << 17;
  const HEAD_EFFECT = 1 << 18;
  const EFFECT_PRESERVED = 1 << 19;
  const USER_EFFECT = 1 << 20;
  const REACTION_IS_UPDATING = 1 << 21;
  const ASYNC = 1 << 22;
  const ERROR_VALUE = 1 << 23;
  const STATE_SYMBOL = Symbol("$state");
  const LEGACY_PROPS = Symbol("legacy props");
  const LOADING_ATTR_SYMBOL = Symbol("");
  const STALE_REACTION = new class StaleReactionError extends Error {
    name = "StaleReactionError";
    message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
  }();
  const TEXT_NODE = 3;
  const COMMENT_NODE = 8;
  function await_outside_boundary() {
    {
      throw new Error(`https://svelte.dev/e/await_outside_boundary`);
    }
  }
  function lifecycle_outside_component(name) {
    {
      throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
    }
  }
  function async_derived_orphan() {
    {
      throw new Error(`https://svelte.dev/e/async_derived_orphan`);
    }
  }
  function effect_in_teardown(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_in_teardown`);
    }
  }
  function effect_in_unowned_derived() {
    {
      throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
    }
  }
  function effect_orphan(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_orphan`);
    }
  }
  function effect_update_depth_exceeded() {
    {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  function hydration_failed() {
    {
      throw new Error(`https://svelte.dev/e/hydration_failed`);
    }
  }
  function state_descriptors_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    }
  }
  function state_prototype_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    }
  }
  function state_unsafe_mutation() {
    {
      throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    }
  }
  function hydration_mismatch(location) {
    {
      console.warn(`https://svelte.dev/e/hydration_mismatch`);
    }
  }
  let hydrating = false;
  function set_hydrating(value) {
    hydrating = value;
  }
  let hydrate_node;
  function set_hydrate_node(node) {
    if (node === null) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    return hydrate_node = node;
  }
  function hydrate_next() {
    return set_hydrate_node(
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(hydrate_node)
    );
  }
  function reset(node) {
    if (!hydrating) return;
    if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    hydrate_node = node;
  }
  function next(count = 1) {
    if (hydrating) {
      var i = count;
      var node = hydrate_node;
      while (i--) {
        node = /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node);
      }
      hydrate_node = node;
    }
  }
  function remove_nodes() {
    var depth = 0;
    var node = hydrate_node;
    while (true) {
      if (node.nodeType === COMMENT_NODE) {
        var data = (
          /** @type {Comment} */
          node.data
        );
        if (data === HYDRATION_END) {
          if (depth === 0) return node;
          depth -= 1;
        } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
          depth += 1;
        }
      }
      var next2 = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      node.remove();
      node = next2;
    }
  }
  function read_hydration_instruction(node) {
    if (!node || node.nodeType !== COMMENT_NODE) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    return (
      /** @type {Comment} */
      node.data
    );
  }
  function equals(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function not_equal(a, b) {
    return a !== b;
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }
  let legacy_mode_flag = false;
  let tracing_mode_flag = false;
  function enable_legacy_mode_flag() {
    legacy_mode_flag = true;
  }
  let component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  function push$1(props, runes = false, fn) {
    component_context = {
      p: component_context,
      c: null,
      e: null,
      s: props,
      x: null,
      l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
    };
  }
  function pop$1(component2) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    var effects = context.e;
    if (effects !== null) {
      context.e = null;
      for (var fn of effects) {
        create_user_effect(fn);
      }
    }
    if (component2 !== void 0) {
      context.x = component2;
    }
    component_context = context.p;
    return component2 ?? /** @type {T} */
    {};
  }
  function is_runes() {
    return !legacy_mode_flag || component_context !== null && component_context.l === null;
  }
  const adjustments = /* @__PURE__ */ new WeakMap();
  function handle_error(error) {
    var effect2 = active_effect;
    if (effect2 === null) {
      active_reaction.f |= ERROR_VALUE;
      return error;
    }
    if ((effect2.f & EFFECT_RAN) === 0) {
      if ((effect2.f & BOUNDARY_EFFECT) === 0) {
        if (!effect2.parent && error instanceof Error) {
          apply_adjustments(error);
        }
        throw error;
      }
      effect2.b.error(error);
    } else {
      invoke_error_boundary(error, effect2);
    }
  }
  function invoke_error_boundary(error, effect2) {
    while (effect2 !== null) {
      if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
        try {
          effect2.b.error(error);
          return;
        } catch (e) {
          error = e;
        }
      }
      effect2 = effect2.parent;
    }
    if (error instanceof Error) {
      apply_adjustments(error);
    }
    throw error;
  }
  function apply_adjustments(error) {
    const adjusted = adjustments.get(error);
    if (adjusted) {
      define_property(error, "message", {
        value: adjusted.message
      });
      define_property(error, "stack", {
        value: adjusted.stack
      });
    }
  }
  let micro_tasks = [];
  let idle_tasks = [];
  function run_micro_tasks() {
    var tasks2 = micro_tasks;
    micro_tasks = [];
    run_all(tasks2);
  }
  function run_idle_tasks() {
    var tasks2 = idle_tasks;
    idle_tasks = [];
    run_all(tasks2);
  }
  function queue_micro_task(fn) {
    if (micro_tasks.length === 0) {
      queueMicrotask(run_micro_tasks);
    }
    micro_tasks.push(fn);
  }
  function flush_tasks() {
    if (micro_tasks.length > 0) {
      run_micro_tasks();
    }
    if (idle_tasks.length > 0) {
      run_idle_tasks();
    }
  }
  function get_pending_boundary() {
    var boundary = (
      /** @type {Effect} */
      active_effect.b
    );
    while (boundary !== null && !boundary.has_pending_snippet()) {
      boundary = boundary.parent;
    }
    if (boundary === null) {
      await_outside_boundary();
    }
    return boundary;
  }
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    var flags = DERIVED | DIRTY;
    var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
      /** @type {Derived} */
      active_reaction
    ) : null;
    if (active_effect === null || parent_derived !== null && (parent_derived.f & UNOWNED) !== 0) {
      flags |= UNOWNED;
    } else {
      active_effect.f |= EFFECT_PRESERVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals,
      f: flags,
      fn,
      reactions: null,
      rv: 0,
      v: (
        /** @type {V} */
        UNINITIALIZED
      ),
      wv: 0,
      parent: parent_derived ?? active_effect,
      ac: null
    };
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function async_derived(fn, location) {
    let parent = (
      /** @type {Effect | null} */
      active_effect
    );
    if (parent === null) {
      async_derived_orphan();
    }
    var boundary = (
      /** @type {Boundary} */
      parent.b
    );
    var promise = (
      /** @type {Promise<V>} */
      /** @type {unknown} */
      void 0
    );
    var signal = source$1(
      /** @type {V} */
      UNINITIALIZED
    );
    var prev2 = null;
    var should_suspend = !active_reaction;
    async_effect(() => {
      try {
        var p = fn();
      } catch (error) {
        p = Promise.reject(error);
      }
      var r = () => p;
      promise = prev2?.then(r, r) ?? Promise.resolve(p);
      prev2 = promise;
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      var pending = boundary.pending;
      if (should_suspend) {
        boundary.update_pending_count(1);
        if (!pending) batch.increment();
      }
      const handler = (value, error = void 0) => {
        prev2 = null;
        if (!pending) batch.activate();
        if (error) {
          if (error !== STALE_REACTION) {
            signal.f |= ERROR_VALUE;
            internal_set(signal, error);
          }
        } else {
          if ((signal.f & ERROR_VALUE) !== 0) {
            signal.f ^= ERROR_VALUE;
          }
          internal_set(signal, value);
        }
        if (should_suspend) {
          boundary.update_pending_count(-1);
          if (!pending) batch.decrement();
        }
        unset_context();
      };
      promise.then(handler, (e) => handler(null, e || "unknown"));
      if (batch) {
        return () => {
          queueMicrotask(() => batch.neuter());
        };
      }
    });
    return new Promise((fulfil) => {
      function next2(p) {
        function go() {
          if (p === promise) {
            fulfil(signal);
          } else {
            next2(promise);
          }
        }
        p.then(go, go);
      }
      next2(promise);
    });
  }
  // @__NO_SIDE_EFFECTS__
  function user_derived(fn) {
    const d = /* @__PURE__ */ derived(fn);
    push_reaction_value(d);
    return d;
  }
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived2) {
    var effects = derived2.effects;
    if (effects !== null) {
      derived2.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
          /** @type {Effect} */
          effects[i]
        );
      }
    }
  }
  function get_derived_parent_effect(derived2) {
    var parent = derived2.parent;
    while (parent !== null) {
      if ((parent.f & DERIVED) === 0) {
        return (
          /** @type {Effect} */
          parent
        );
      }
      parent = parent.parent;
    }
    return null;
  }
  function execute_derived(derived2) {
    var value;
    var prev_active_effect = active_effect;
    set_active_effect(get_derived_parent_effect(derived2));
    {
      try {
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
      }
    }
    return value;
  }
  function update_derived(derived2) {
    var value = execute_derived(derived2);
    if (!derived2.equals(value)) {
      derived2.v = value;
      derived2.wv = increment_write_version();
    }
    if (is_destroying_effect) return;
    if (batch_deriveds !== null) {
      batch_deriveds.set(derived2, derived2.v);
    } else {
      var status = (skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
      set_signal_status(derived2, status);
    }
  }
  function flatten(sync, async, fn) {
    const d = is_runes() ? derived : derived_safe_equal;
    if (async.length === 0) {
      fn(sync.map(d));
      return;
    }
    var batch = current_batch;
    var parent = (
      /** @type {Effect} */
      active_effect
    );
    var restore = capture();
    var boundary = get_pending_boundary();
    Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then((result) => {
      batch?.activate();
      restore();
      try {
        fn([...sync.map(d), ...result]);
      } catch (error) {
        if ((parent.f & DESTROYED) === 0) {
          invoke_error_boundary(error, parent);
        }
      }
      batch?.deactivate();
      unset_context();
    }).catch((error) => {
      boundary.error(error);
    });
  }
  function capture() {
    var previous_effect = active_effect;
    var previous_reaction = active_reaction;
    var previous_component_context = component_context;
    return function restore() {
      set_active_effect(previous_effect);
      set_active_reaction(previous_reaction);
      set_component_context(previous_component_context);
    };
  }
  function unset_context() {
    set_active_effect(null);
    set_active_reaction(null);
    set_component_context(null);
  }
  const batches = /* @__PURE__ */ new Set();
  let current_batch = null;
  let batch_deriveds = null;
  let effect_pending_updates = /* @__PURE__ */ new Set();
  let tasks = [];
  function dequeue() {
    const task = (
      /** @type {() => void} */
      tasks.shift()
    );
    if (tasks.length > 0) {
      queueMicrotask(dequeue);
    }
    task();
  }
  let queued_root_effects = [];
  let last_scheduled_effect = null;
  let is_flushing = false;
  class Batch {
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    #current = /* @__PURE__ */ new Map();
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    #previous = /* @__PURE__ */ new Map();
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    #callbacks = /* @__PURE__ */ new Set();
    /**
     * The number of async effects that are currently in flight
     */
    #pending = 0;
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    #deferred = null;
    /**
     * True if an async effect inside this batch resolved and
     * its parent branch was already deleted
     */
    #neutered = false;
    /**
     * Async effects (created inside `async_derived`) encountered during processing.
     * These run after the rest of the batch has updated, since they should
     * always have the latest values
     * @type {Effect[]}
     */
    #async_effects = [];
    /**
     * The same as `#async_effects`, but for effects inside a newly-created
     * `<svelte:boundary>` — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    #boundary_async_effects = [];
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    #render_effects = [];
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    #effects = [];
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    #block_effects = [];
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    skipped_effects = /* @__PURE__ */ new Set();
    /**
     *
     * @param {Effect[]} root_effects
     */
    #process(root_effects) {
      queued_root_effects = [];
      var current_values = null;
      if (batches.size > 1) {
        current_values = /* @__PURE__ */ new Map();
        batch_deriveds = /* @__PURE__ */ new Map();
        for (const [source2, current2] of this.#current) {
          current_values.set(source2, { v: source2.v, wv: source2.wv });
          source2.v = current2;
        }
        for (const batch of batches) {
          if (batch === this) continue;
          for (const [source2, previous] of batch.#previous) {
            if (!current_values.has(source2)) {
              current_values.set(source2, { v: source2.v, wv: source2.wv });
              source2.v = previous;
            }
          }
        }
      }
      for (const root2 of root_effects) {
        this.#traverse_effect_tree(root2);
      }
      if (this.#async_effects.length === 0 && this.#pending === 0) {
        var render_effects = this.#render_effects;
        var effects = this.#effects;
        this.#render_effects = [];
        this.#effects = [];
        this.#block_effects = [];
        this.#commit();
        flush_queued_effects(render_effects);
        flush_queued_effects(effects);
        this.#deferred?.resolve();
      } else {
        for (const e of this.#render_effects) set_signal_status(e, CLEAN);
        for (const e of this.#effects) set_signal_status(e, CLEAN);
        for (const e of this.#block_effects) set_signal_status(e, CLEAN);
      }
      if (current_values) {
        for (const [source2, { v, wv }] of current_values) {
          if (source2.wv <= wv) {
            source2.v = v;
          }
        }
        batch_deriveds = null;
      }
      for (const effect2 of this.#async_effects) {
        update_effect(effect2);
      }
      for (const effect2 of this.#boundary_async_effects) {
        update_effect(effect2);
      }
      this.#async_effects = [];
      this.#boundary_async_effects = [];
    }
    /**
     * Traverse the effect tree, executing effects or stashing
     * them for later execution as appropriate
     * @param {Effect} root
     */
    #traverse_effect_tree(root2) {
      root2.f ^= CLEAN;
      var effect2 = root2.first;
      while (effect2 !== null) {
        var flags = effect2.f;
        var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
        var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
        var skip = is_skippable_branch || (flags & INERT) !== 0 || this.skipped_effects.has(effect2);
        if (!skip && effect2.fn !== null) {
          if (is_branch) {
            effect2.f ^= CLEAN;
          } else if ((flags & EFFECT) !== 0) {
            this.#effects.push(effect2);
          } else if (is_dirty(effect2)) {
            if ((flags & ASYNC) !== 0) {
              var effects = effect2.b?.pending ? this.#boundary_async_effects : this.#async_effects;
              effects.push(effect2);
            } else {
              if ((effect2.f & BLOCK_EFFECT) !== 0) this.#block_effects.push(effect2);
              update_effect(effect2);
            }
          }
          var child2 = effect2.first;
          if (child2 !== null) {
            effect2 = child2;
            continue;
          }
        }
        var parent = effect2.parent;
        effect2 = effect2.next;
        while (effect2 === null && parent !== null) {
          effect2 = parent.next;
          parent = parent.parent;
        }
      }
    }
    /**
     * Associate a change to a given source with the current
     * batch, noting its previous and current values
     * @param {Source} source
     * @param {any} value
     */
    capture(source2, value) {
      if (!this.#previous.has(source2)) {
        this.#previous.set(source2, value);
      }
      this.#current.set(source2, source2.v);
    }
    activate() {
      current_batch = this;
    }
    deactivate() {
      current_batch = null;
      for (const update2 of effect_pending_updates) {
        effect_pending_updates.delete(update2);
        update2();
        if (current_batch !== null) {
          break;
        }
      }
    }
    neuter() {
      this.#neutered = true;
    }
    flush() {
      if (queued_root_effects.length > 0) {
        this.flush_effects();
      } else {
        this.#commit();
      }
      if (current_batch !== this) {
        return;
      }
      if (this.#pending === 0) {
        batches.delete(this);
      }
      this.deactivate();
    }
    flush_effects() {
      var was_updating_effect = is_updating_effect;
      is_flushing = true;
      try {
        var flush_count = 0;
        set_is_updating_effect(true);
        while (queued_root_effects.length > 0) {
          if (flush_count++ > 1e3) {
            var updates, entry;
            if (DEV) ;
            infinite_loop_guard();
          }
          this.#process(queued_root_effects);
          old_values.clear();
        }
      } finally {
        is_flushing = false;
        set_is_updating_effect(was_updating_effect);
        last_scheduled_effect = null;
      }
    }
    /**
     * Append and remove branches to/from the DOM
     */
    #commit() {
      if (!this.#neutered) {
        for (const fn of this.#callbacks) {
          fn();
        }
      }
      this.#callbacks.clear();
    }
    increment() {
      this.#pending += 1;
    }
    decrement() {
      this.#pending -= 1;
      if (this.#pending === 0) {
        for (const e of this.#render_effects) {
          set_signal_status(e, DIRTY);
          schedule_effect(e);
        }
        for (const e of this.#effects) {
          set_signal_status(e, DIRTY);
          schedule_effect(e);
        }
        for (const e of this.#block_effects) {
          set_signal_status(e, DIRTY);
          schedule_effect(e);
        }
        this.#render_effects = [];
        this.#effects = [];
        this.flush();
      } else {
        this.deactivate();
      }
    }
    /** @param {() => void} fn */
    add_callback(fn) {
      this.#callbacks.add(fn);
    }
    settled() {
      return (this.#deferred ??= deferred()).promise;
    }
    static ensure(autoflush = true) {
      if (current_batch === null) {
        const batch = current_batch = new Batch();
        batches.add(current_batch);
        if (autoflush) {
          Batch.enqueue(() => {
            if (current_batch !== batch) {
              return;
            }
            batch.flush();
          });
        }
      }
      return current_batch;
    }
    /** @param {() => void} task */
    static enqueue(task) {
      if (tasks.length === 0) {
        queueMicrotask(dequeue);
      }
      tasks.unshift(task);
    }
  }
  function flushSync(fn) {
    var result;
    const batch = Batch.ensure(false);
    while (true) {
      flush_tasks();
      if (queued_root_effects.length === 0) {
        if (batch === current_batch) {
          batch.flush();
        }
        last_scheduled_effect = null;
        return (
          /** @type {T} */
          result
        );
      }
      batch.flush_effects();
    }
  }
  function infinite_loop_guard() {
    try {
      effect_update_depth_exceeded();
    } catch (error) {
      invoke_error_boundary(error, last_scheduled_effect);
    }
  }
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    for (var i = 0; i < length; i++) {
      var effect2 = effects[i];
      if ((effect2.f & (DESTROYED | INERT)) === 0) {
        if (is_dirty(effect2)) {
          var wv = write_version;
          update_effect(effect2);
          if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
            if (effect2.teardown === null && effect2.ac === null) {
              unlink_effect(effect2);
            } else {
              effect2.fn = null;
            }
          }
          if (write_version > wv && (effect2.f & USER_EFFECT) !== 0) {
            break;
          }
        }
      }
    }
    for (; i < length; i += 1) {
      schedule_effect(effects[i]);
    }
  }
  function schedule_effect(signal) {
    var effect2 = last_scheduled_effect = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags = effect2.f;
      if (is_flushing && effect2 === active_effect && (flags & BLOCK_EFFECT) !== 0) {
        return;
      }
      if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags & CLEAN) === 0) return;
        effect2.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect2);
  }
  const old_values = /* @__PURE__ */ new Map();
  function source$1(v, stack2) {
    var signal = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals,
      rv: 0,
      wv: 0
    };
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function state$1(v, stack2) {
    const s = source$1(v);
    push_reaction_value(s);
    return s;
  }
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value, immutable = false, trackable = true) {
    const s = source$1(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
      (component_context.l.s ??= []).push(s);
    }
    return s;
  }
  function set(source2, value, should_proxy = false) {
    if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
    // to ensure we error if state is set inside an inspect effect
    (!untracking || (active_reaction.f & INSPECT_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | INSPECT_EFFECT)) !== 0 && !current_sources?.includes(source2)) {
      state_unsafe_mutation();
    }
    let new_value = should_proxy ? proxy(value) : value;
    return internal_set(source2, new_value);
  }
  function internal_set(source2, value) {
    if (!source2.equals(value)) {
      var old_value = source2.v;
      if (is_destroying_effect) {
        old_values.set(source2, value);
      } else {
        old_values.set(source2, old_value);
      }
      source2.v = value;
      const batch = Batch.ensure();
      batch.capture(source2, old_value);
      if ((source2.f & DERIVED) !== 0) {
        if ((source2.f & DIRTY) !== 0) {
          execute_derived(
            /** @type {Derived} */
            source2
          );
        }
        set_signal_status(source2, (source2.f & UNOWNED) === 0 ? CLEAN : MAYBE_DIRTY);
      }
      source2.wv = increment_write_version();
      mark_reactions(source2, DIRTY);
      if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
    }
    return value;
  }
  function update(source2, d = 1) {
    var value = get$1(source2);
    var result = d === 1 ? value++ : value--;
    set(source2, value);
    return result;
  }
  function increment(source2) {
    set(source2, source2.v + 1);
  }
  function mark_reactions(signal, status) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var runes = is_runes();
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags = reaction.f;
      if ((flags & DIRTY) !== 0) continue;
      if (!runes && reaction === active_effect) continue;
      set_signal_status(reaction, status);
      if ((flags & (CLEAN | UNOWNED)) !== 0) {
        if ((flags & DERIVED) !== 0) {
          mark_reactions(
            /** @type {Derived} */
            reaction,
            MAYBE_DIRTY
          );
        } else {
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }
  function proxy(value) {
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = /* @__PURE__ */ state$1(0);
    var parent_version = update_version;
    var with_parent = (fn) => {
      if (update_version === parent_version) {
        return fn();
      }
      var reaction = active_reaction;
      var version2 = update_version;
      set_active_reaction(null);
      set_update_version(parent_version);
      var result = fn();
      set_active_reaction(reaction);
      set_update_version(version2);
      return result;
    };
    if (is_proxied_array) {
      sources.set("length", /* @__PURE__ */ state$1(
        /** @type {any[]} */
        value.length
      ));
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop2, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop2);
          if (s === void 0) {
            s = with_parent(() => {
              var s2 = /* @__PURE__ */ state$1(descriptor.value);
              sources.set(prop2, s2);
              return s2;
            });
          } else {
            set(s, descriptor.value, true);
          }
          return true;
        },
        deleteProperty(target, prop2) {
          var s = sources.get(prop2);
          if (s === void 0) {
            if (prop2 in target) {
              const s2 = with_parent(() => /* @__PURE__ */ state$1(UNINITIALIZED));
              sources.set(prop2, s2);
              increment(version);
            }
          } else {
            set(s, UNINITIALIZED);
            increment(version);
          }
          return true;
        },
        get(target, prop2, receiver) {
          if (prop2 === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop2);
          var exists = prop2 in target;
          if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
            s = with_parent(() => {
              var p = proxy(exists ? target[prop2] : UNINITIALIZED);
              var s2 = /* @__PURE__ */ state$1(p);
              return s2;
            });
            sources.set(prop2, s);
          }
          if (s !== void 0) {
            var v = get$1(s);
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop2, receiver);
        },
        getOwnPropertyDescriptor(target, prop2) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop2);
            if (s) descriptor.value = get$1(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop2);
            var value2 = source2?.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop2) {
          if (prop2 === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop2);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
          if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop2)?.writable)) {
            if (s === void 0) {
              s = with_parent(() => {
                var p = has ? proxy(target[prop2]) : UNINITIALIZED;
                var s2 = /* @__PURE__ */ state$1(p);
                return s2;
              });
              sources.set(prop2, s);
            }
            var value2 = get$1(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop2, value2, receiver) {
          var s = sources.get(prop2);
          var has = prop2 in target;
          if (is_proxied_array && prop2 === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = with_parent(() => /* @__PURE__ */ state$1(UNINITIALIZED));
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || get_descriptor(target, prop2)?.writable) {
              s = with_parent(() => /* @__PURE__ */ state$1(void 0));
              set(s, proxy(value2));
              sources.set(prop2, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            var p = with_parent(() => proxy(value2));
            set(s, p);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor?.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            increment(version);
          }
          return true;
        },
        ownKeys(target) {
          get$1(version);
          var own_keys = Reflect.ownKeys(target).filter((key3) => {
            var source3 = sources.get(key3);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key2, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key2 in target)) {
              own_keys.push(key2);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  var $window;
  var is_firefox;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    is_firefox = /Firefox/.test(navigator.userAgent);
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    var text_prototype = Text.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    if (is_extensible(element_prototype)) {
      element_prototype.__click = void 0;
      element_prototype.__className = void 0;
      element_prototype.__attributes = null;
      element_prototype.__style = void 0;
      element_prototype.__e = void 0;
    }
    if (is_extensible(text_prototype)) {
      text_prototype.__t = void 0;
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return first_child_getter.call(node);
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return next_sibling_getter.call(node);
  }
  function child(node, is_text) {
    if (!hydrating) {
      return /* @__PURE__ */ get_first_child(node);
    }
    var child2 = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(hydrate_node)
    );
    if (child2 === null) {
      child2 = hydrate_node.appendChild(create_text());
    } else if (is_text && child2.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      child2?.before(text2);
      set_hydrate_node(text2);
      return text2;
    }
    set_hydrate_node(child2);
    return child2;
  }
  function first_child(fragment, is_text) {
    if (!hydrating) {
      var first = (
        /** @type {DocumentFragment} */
        /* @__PURE__ */ get_first_child(
          /** @type {Node} */
          fragment
        )
      );
      if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
      return first;
    }
    return hydrate_node;
  }
  function sibling(node, count = 1, is_text = false) {
    let next_sibling = hydrating ? hydrate_node : node;
    var last_sibling;
    while (count--) {
      last_sibling = next_sibling;
      next_sibling = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(next_sibling);
    }
    if (!hydrating) {
      return next_sibling;
    }
    if (is_text && next_sibling?.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      if (next_sibling === null) {
        last_sibling?.after(text2);
      } else {
        next_sibling.before(text2);
      }
      set_hydrate_node(text2);
      return text2;
    }
    set_hydrate_node(next_sibling);
    return (
      /** @type {TemplateNode} */
      next_sibling
    );
  }
  function clear_text_content(node) {
    node.textContent = "";
  }
  function should_defer_append() {
    return false;
  }
  function validate_effect(rune) {
    if (active_effect === null && active_reaction === null) {
      effect_orphan();
    }
    if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0 && active_effect === null) {
      effect_in_unowned_derived();
    }
    if (is_destroying_effect) {
      effect_in_teardown();
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn, sync, push2 = true) {
    var parent = active_effect;
    if (parent !== null && (parent.f & INERT) !== 0) {
      type |= INERT;
    }
    var effect2 = {
      ctx: component_context,
      deps: null,
      nodes_start: null,
      nodes_end: null,
      f: type | DIRTY,
      first: null,
      fn,
      last: null,
      next: null,
      parent,
      b: parent && parent.b,
      prev: null,
      teardown: null,
      transitions: null,
      wv: 0,
      ac: null
    };
    if (sync) {
      try {
        update_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } catch (e) {
        destroy_effect(effect2);
        throw e;
      }
    } else if (fn !== null) {
      schedule_effect(effect2);
    }
    var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & EFFECT_PRESERVED) === 0;
    if (!inert && push2) {
      if (parent !== null) {
        push_effect(effect2, parent);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
        var derived2 = (
          /** @type {Derived} */
          active_reaction
        );
        (derived2.effects ??= []).push(effect2);
      }
    }
    return effect2;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null, false);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    validate_effect();
    var flags = (
      /** @type {Effect} */
      active_effect.f
    );
    var defer = !active_reaction && (flags & BRANCH_EFFECT) !== 0 && (flags & EFFECT_RAN) === 0;
    if (defer) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      (context.e ??= []).push(fn);
    } else {
      return create_user_effect(fn);
    }
  }
  function create_user_effect(fn) {
    return create_effect(EFFECT | USER_EFFECT, fn, false);
  }
  function user_pre_effect(fn) {
    validate_effect();
    return create_effect(RENDER_EFFECT | USER_EFFECT, fn, true);
  }
  function effect_root(fn) {
    Batch.ensure();
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return () => {
      destroy_effect(effect2);
    };
  }
  function component_root(fn) {
    Batch.ensure();
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect2, () => {
            destroy_effect(effect2);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect2);
          fulfil(void 0);
        }
      });
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn, false);
  }
  function async_effect(fn) {
    return create_effect(ASYNC | EFFECT_PRESERVED, fn, true);
  }
  function render_effect(fn, flags = 0) {
    return create_effect(RENDER_EFFECT | flags, fn, true);
  }
  function template_effect(fn, sync = [], async = []) {
    flatten(sync, async, (values) => {
      create_effect(RENDER_EFFECT, () => fn(...values.map(get$1)), true);
    });
  }
  function block(fn, flags = 0) {
    var effect2 = create_effect(BLOCK_EFFECT | flags, fn, true);
    return effect2;
  }
  function branch(fn, push2 = true) {
    return create_effect(BRANCH_EFFECT, fn, true, push2);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      effect2.ac?.abort(STALE_REACTION);
      var next2 = effect2.next;
      if ((effect2.f & ROOT_EFFECT) !== 0) {
        effect2.parent = null;
      } else {
        destroy_effect(effect2, remove_dom);
      }
      effect2 = next2;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next2 = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next2;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null && effect2.nodes_end !== null) {
      remove_effect_dom(
        effect2.nodes_start,
        /** @type {TemplateNode} */
        effect2.nodes_end
      );
      removed = true;
    }
    destroy_effect_children(effect2, remove_dom && !removed);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    var transitions = effect2.transitions;
    if (transitions !== null) {
      for (const transition of transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect2);
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = effect2.ac = null;
  }
  function remove_effect_dom(node, end) {
    while (node !== null) {
      var next2 = node === end ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      node.remove();
      node = next2;
    }
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev2 = effect2.prev;
    var next2 = effect2.next;
    if (prev2 !== null) prev2.next = next2;
    if (next2 !== null) next2.prev = prev2;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next2;
      if (parent.last === effect2) parent.last = prev2;
    }
  }
  function pause_effect(effect2, callback) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    run_out_transitions(transitions, () => {
      destroy_effect(effect2);
      if (callback) callback();
    });
  }
  function run_out_transitions(transitions, fn) {
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition of transitions) {
        transition.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    if (effect2.transitions !== null) {
      for (const transition of effect2.transitions) {
        if (transition.is_global || local) {
          transitions.push(transition);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }
  function resume_effect(effect2) {
    resume_children(effect2, true);
  }
  function resume_children(effect2, local) {
    if ((effect2.f & INERT) === 0) return;
    effect2.f ^= INERT;
    if ((effect2.f & CLEAN) === 0) {
      set_signal_status(effect2, DIRTY);
      schedule_effect(effect2);
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    if (effect2.transitions !== null) {
      for (const transition of effect2.transitions) {
        if (transition.is_global || local) {
          transition.in();
        }
      }
    }
  }
  let is_updating_effect = false;
  function set_is_updating_effect(value) {
    is_updating_effect = value;
  }
  let is_destroying_effect = false;
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  let active_reaction = null;
  let untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  let active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  let current_sources = null;
  function push_reaction_value(value) {
    if (active_reaction !== null && true) {
      if (current_sources === null) {
        current_sources = [value];
      } else {
        current_sources.push(value);
      }
    }
  }
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let write_version = 1;
  let read_version = 0;
  let update_version = read_version;
  function set_update_version(value) {
    update_version = value;
  }
  let skip_reaction = false;
  function increment_write_version() {
    return ++write_version;
  }
  function is_dirty(reaction) {
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) {
      return true;
    }
    if ((flags & MAYBE_DIRTY) !== 0) {
      var dependencies = reaction.deps;
      var is_unowned = (flags & UNOWNED) !== 0;
      if (dependencies !== null) {
        var i;
        var dependency;
        var is_disconnected = (flags & DISCONNECTED) !== 0;
        var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
        var length = dependencies.length;
        if ((is_disconnected || is_unowned_connected) && (active_effect === null || (active_effect.f & DESTROYED) === 0)) {
          var derived2 = (
            /** @type {Derived} */
            reaction
          );
          var parent = derived2.parent;
          for (i = 0; i < length; i++) {
            dependency = dependencies[i];
            if (is_disconnected || !dependency?.reactions?.includes(derived2)) {
              (dependency.reactions ??= []).push(derived2);
            }
          }
          if (is_disconnected) {
            derived2.f ^= DISCONNECTED;
          }
          if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
            derived2.f ^= UNOWNED;
          }
        }
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (is_dirty(
            /** @type {Derived} */
            dependency
          )) {
            update_derived(
              /** @type {Derived} */
              dependency
            );
          }
          if (dependency.wv > reaction.wv) {
            return true;
          }
        }
      }
      if (!is_unowned || active_effect !== null && !skip_reaction) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    if (current_sources?.includes(signal)) {
      return;
    }
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
          /** @type {Derived} */
          reaction,
          effect2,
          false
        );
      } else if (effect2 === reaction) {
        if (root2) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_skip_reaction = skip_reaction;
    var previous_sources = current_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var previous_update_version = update_version;
    var flags = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    skip_reaction = (flags & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
    active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    current_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    update_version = ++read_version;
    if (reaction.ac !== null) {
      reaction.ac.abort(STALE_REACTION);
      reaction.ac = null;
    }
    try {
      reaction.f |= REACTION_IS_UPDATING;
      var result = (
        /** @type {Function} */
        (0, reaction.fn)()
      );
      var deps = reaction.deps;
      if (new_deps !== null) {
        var i;
        remove_reactions(reaction, skipped_deps);
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (!skip_reaction || // Deriveds that already have reactions can cleanup, so we still add them as reactions
        (flags & DERIVED) !== 0 && /** @type {import('#client').Derived} */
        reaction.reactions !== null) {
          for (i = skipped_deps; i < deps.length; i++) {
            (deps[i].reactions ??= []).push(reaction);
          }
        }
      } else if (deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i < /** @type {Source[]} */
        untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
            /** @type {Effect} */
            reaction
          );
        }
      }
      if (previous_reaction !== null && previous_reaction !== reaction) {
        read_version++;
        if (untracked_writes !== null) {
          if (previous_untracked_writes === null) {
            previous_untracked_writes = untracked_writes;
          } else {
            previous_untracked_writes.push(.../** @type {Source[]} */
            untracked_writes);
          }
        }
      }
      if ((reaction.f & ERROR_VALUE) !== 0) {
        reaction.f ^= ERROR_VALUE;
      }
      return result;
    } catch (error) {
      return handle_error(error);
    } finally {
      reaction.f ^= REACTION_IS_UPDATING;
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      skip_reaction = previous_skip_reaction;
      current_sources = previous_sources;
      set_component_context(previous_component_context);
      untracking = previous_untracking;
      update_version = previous_update_version;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index2 = index_of.call(reactions, signal);
      if (index2 !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index2] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !new_deps.includes(dependency))) {
      set_signal_status(dependency, MAYBE_DIRTY);
      if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
        dependency.f ^= DISCONNECTED;
      }
      destroy_derived_effects(
        /** @type {Derived} **/
        dependency
      );
      remove_reactions(
        /** @type {Derived} **/
        dependency,
        0
      );
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags = effect2.f;
    if ((flags & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var was_updating_effect = is_updating_effect;
    active_effect = effect2;
    is_updating_effect = true;
    try {
      if ((flags & BLOCK_EFFECT) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.wv = write_version;
      var dep;
      if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) ;
    } finally {
      is_updating_effect = was_updating_effect;
      active_effect = previous_effect;
    }
  }
  function get$1(signal) {
    var flags = signal.f;
    var is_derived = (flags & DERIVED) !== 0;
    if (active_reaction !== null && !untracking) {
      var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
      if (!destroyed && !current_sources?.includes(signal)) {
        var deps = active_reaction.deps;
        if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
          if (signal.rv < read_version) {
            signal.rv = read_version;
            if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
              skipped_deps++;
            } else if (new_deps === null) {
              new_deps = [signal];
            } else if (!skip_reaction || !new_deps.includes(signal)) {
              new_deps.push(signal);
            }
          }
        } else {
          (active_reaction.deps ??= []).push(signal);
          var reactions = signal.reactions;
          if (reactions === null) {
            signal.reactions = [active_reaction];
          } else if (!reactions.includes(active_reaction)) {
            reactions.push(active_reaction);
          }
        }
      }
    } else if (is_derived && /** @type {Derived} */
    signal.deps === null && /** @type {Derived} */
    signal.effects === null) {
      var derived2 = (
        /** @type {Derived} */
        signal
      );
      var parent = derived2.parent;
      if (parent !== null && (parent.f & UNOWNED) === 0) {
        derived2.f ^= UNOWNED;
      }
    }
    if (is_destroying_effect) {
      if (old_values.has(signal)) {
        return old_values.get(signal);
      }
      if (is_derived) {
        derived2 = /** @type {Derived} */
        signal;
        var value = derived2.v;
        if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
          value = execute_derived(derived2);
        }
        old_values.set(derived2, value);
        return value;
      }
    } else if (is_derived) {
      derived2 = /** @type {Derived} */
      signal;
      if (batch_deriveds?.has(derived2)) {
        return batch_deriveds.get(derived2);
      }
      if (is_dirty(derived2)) {
        update_derived(derived2);
      }
    }
    if ((signal.f & ERROR_VALUE) !== 0) {
      throw signal.v;
    }
    return signal.v;
  }
  function depends_on_old_values(derived2) {
    if (derived2.v === UNINITIALIZED) return true;
    if (derived2.deps === null) return false;
    for (const dep of derived2.deps) {
      if (old_values.has(dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
        /** @type {Derived} */
        dep
      )) {
        return true;
      }
    }
    return false;
  }
  function untrack(fn) {
    var previous_untracking = untracking;
    try {
      untracking = true;
      return fn();
    } finally {
      untracking = previous_untracking;
    }
  }
  const STATUS_MASK = -7169;
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function deep_read_state(value) {
    if (typeof value !== "object" || !value || value instanceof EventTarget) {
      return;
    }
    if (STATE_SYMBOL in value) {
      deep_read(value);
    } else if (!Array.isArray(value)) {
      for (let key2 in value) {
        const prop2 = value[key2];
        if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
          deep_read(prop2);
        }
      }
    }
  }
  function deep_read(value, visited = /* @__PURE__ */ new Set()) {
    if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
    !(value instanceof EventTarget) && !visited.has(value)) {
      visited.add(value);
      if (value instanceof Date) {
        value.getTime();
      }
      for (let key2 in value) {
        try {
          deep_read(value[key2], visited);
        } catch (e) {
        }
      }
      const proto = get_prototype_of(value);
      if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
        const descriptors = get_descriptors(proto);
        for (let key2 in descriptors) {
          const get2 = descriptors[key2].get;
          if (get2) {
            try {
              get2.call(value);
            } catch (e) {
            }
          }
        }
      }
    }
  }
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function replay_events(dom) {
    if (!hydrating) return;
    dom.removeAttribute("onload");
    dom.removeAttribute("onerror");
    const event2 = dom.__e;
    if (event2 !== void 0) {
      dom.__e = void 0;
      queueMicrotask(() => {
        if (dom.isConnected) {
          dom.dispatchEvent(event2);
        }
      });
    }
  }
  function create_event(event_name, dom, handler, options = {}) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation.call(dom, event2);
      }
      if (!event2.cancelBubble) {
        return without_reactive_context(() => {
          return handler?.call(this, event2);
        });
      }
    }
    if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function event(event_name, dom, handler, capture2, passive) {
    var options = { capture: capture2, passive };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || // @ts-ignore
    dom === window || // @ts-ignore
    dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
    dom instanceof HTMLMediaElement) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function delegate(events) {
    for (var i = 0; i < events.length; i++) {
      all_registered_events.add(events[i]);
    }
    for (var fn of root_event_handles) {
      fn(events);
    }
  }
  function handle_event_propagation(event2) {
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event2.type;
    var path = event2.composedPath?.() || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    var path_idx = 0;
    var handled_at = event2.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
        current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated != null && (!/** @type {any} */
          current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          event2.target === current_target)) {
            if (is_array(delegated)) {
              var [fn, ...data] = delegated;
              fn.apply(current_target, [event2, ...data]);
            } else {
              delegated.call(current_target, event2);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2.__root = handler_element;
      delete event2.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function create_fragment_from_html(html) {
    var elem = document.createElement("template");
    elem.innerHTML = html.replaceAll("<!>", "<!---->");
    return elem.content;
  }
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes_start === null) {
      effect2.nodes_start = start;
      effect2.nodes_end = end;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function from_html(content, flags) {
    var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (hydrating) {
        assign_nodes(hydrate_node, null);
        return hydrate_node;
      }
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        if (!is_fragment) node = /** @type {Node} */
        /* @__PURE__ */ get_first_child(node);
      }
      var clone = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(clone)
        );
        var end = (
          /** @type {TemplateNode} */
          clone.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  function text(value = "") {
    if (!hydrating) {
      var t = create_text(value + "");
      assign_nodes(t, t);
      return t;
    }
    var node = hydrate_node;
    if (node.nodeType !== TEXT_NODE) {
      node.before(node = create_text());
      set_hydrate_node(node);
    }
    assign_nodes(node, node);
    return node;
  }
  function comment() {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    var frag = document.createDocumentFragment();
    var start = document.createComment("");
    var anchor = create_text();
    frag.append(start, anchor);
    assign_nodes(start, anchor);
    return frag;
  }
  function append(anchor, dom) {
    if (hydrating) {
      active_effect.nodes_end = hydrate_node;
      hydrate_next();
      return;
    }
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }
  function set_text(text2, value) {
    var str = value == null ? "" : typeof value === "object" ? value + "" : value;
    if (str !== (text2.__t ??= text2.nodeValue)) {
      text2.__t = str;
      text2.nodeValue = str + "";
    }
  }
  function mount(component2, options) {
    return _mount(component2, options);
  }
  function hydrate(component2, options) {
    init_operations();
    options.intro = options.intro ?? false;
    const target = options.target;
    const was_hydrating = hydrating;
    const previous_hydrate_node = hydrate_node;
    try {
      var anchor = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(target)
      );
      while (anchor && (anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */
      anchor.data !== HYDRATION_START)) {
        anchor = /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(anchor);
      }
      if (!anchor) {
        throw HYDRATION_ERROR;
      }
      set_hydrating(true);
      set_hydrate_node(
        /** @type {Comment} */
        anchor
      );
      hydrate_next();
      const instance = _mount(component2, { ...options, anchor });
      if (hydrate_node === null || hydrate_node.nodeType !== COMMENT_NODE || /** @type {Comment} */
      hydrate_node.data !== HYDRATION_END) {
        hydration_mismatch();
        throw HYDRATION_ERROR;
      }
      set_hydrating(false);
      return (
        /**  @type {Exports} */
        instance
      );
    } catch (error) {
      if (error === HYDRATION_ERROR) {
        if (options.recover === false) {
          hydration_failed();
        }
        init_operations();
        clear_text_content(target);
        set_hydrating(false);
        return mount(component2, options);
      }
      throw error;
    } finally {
      set_hydrating(was_hydrating);
      set_hydrate_node(previous_hydrate_node);
    }
  }
  const document_listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    init_operations();
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive = is_passive_event(event_name);
        target.addEventListener(event_name, handle_event_propagation, { passive });
        var n = document_listeners.get(event_name);
        if (n === void 0) {
          document.addEventListener(event_name, handle_event_propagation, { passive });
          document_listeners.set(event_name, 1);
        } else {
          document_listeners.set(event_name, n + 1);
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    var component2 = void 0;
    var unmount2 = component_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      branch(() => {
        if (context) {
          push$1({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        if (hydrating) {
          assign_nodes(
            /** @type {TemplateNode} */
            anchor_node,
            null
          );
        }
        component2 = Component(anchor_node, props) || {};
        if (hydrating) {
          active_effect.nodes_end = hydrate_node;
        }
        if (context) {
          pop$1();
        }
      });
      return () => {
        for (var event_name of registered_events) {
          target.removeEventListener(event_name, handle_event_propagation);
          var n = (
            /** @type {number} */
            document_listeners.get(event_name)
          );
          if (--n === 0) {
            document.removeEventListener(event_name, handle_event_propagation);
            document_listeners.delete(event_name);
          } else {
            document_listeners.set(event_name, n);
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          anchor_node.parentNode?.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component2, unmount2);
    return component2;
  }
  let mounted_components = /* @__PURE__ */ new WeakMap();
  function unmount(component2, options) {
    const fn = mounted_components.get(component2);
    if (fn) {
      mounted_components.delete(component2);
      return fn(options);
    }
    return Promise.resolve();
  }
  function snippet(node, get_snippet, ...args) {
    var anchor = node;
    var snippet2 = noop;
    var snippet_effect;
    block(() => {
      if (snippet2 === (snippet2 = get_snippet())) return;
      if (snippet_effect) {
        destroy_effect(snippet_effect);
        snippet_effect = null;
      }
      snippet_effect = branch(() => (
        /** @type {SnippetFn} */
        snippet2(anchor, ...args)
      ));
    }, EFFECT_TRANSPARENT);
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function onMount(fn) {
    if (component_context === null) {
      lifecycle_outside_component();
    }
    if (legacy_mode_flag && component_context.l !== null) {
      init_update_callbacks(component_context).m.push(fn);
    } else {
      user_effect(() => {
        const cleanup = untrack(fn);
        if (typeof cleanup === "function") return (
          /** @type {() => void} */
          cleanup
        );
      });
    }
  }
  function onDestroy(fn) {
    if (component_context === null) {
      lifecycle_outside_component();
    }
    onMount(() => () => untrack(fn));
  }
  function init_update_callbacks(context) {
    var l = (
      /** @type {ComponentContextLegacy} */
      context.l
    );
    return l.u ??= { a: [], b: [], m: [] };
  }
  const PENDING = 0;
  const THEN = 1;
  const CATCH = 2;
  function await_block(node, get_input, pending_fn, then_fn, catch_fn) {
    if (hydrating) {
      hydrate_next();
    }
    var anchor = node;
    var runes = is_runes();
    var active_component_context = component_context;
    var input = UNINITIALIZED;
    var pending_effect;
    var then_effect;
    var catch_effect;
    var input_source = runes ? source$1(
      /** @type {V} */
      void 0
    ) : /* @__PURE__ */ mutable_source(
      /** @type {V} */
      void 0,
      false,
      false
    );
    var error_source = runes ? source$1(void 0) : /* @__PURE__ */ mutable_source(void 0, false, false);
    var resolved = false;
    function update2(state2, restore) {
      resolved = true;
      if (restore) {
        set_active_effect(effect2);
        set_active_reaction(effect2);
        set_component_context(active_component_context);
      }
      try {
        if (state2 === PENDING && pending_fn) {
          if (pending_effect) resume_effect(pending_effect);
          else pending_effect = branch(() => pending_fn(anchor));
        }
        if (state2 === THEN && then_fn) {
          if (then_effect) resume_effect(then_effect);
          else then_effect = branch(() => then_fn(anchor, input_source));
        }
        if (state2 === CATCH && catch_fn) {
          if (catch_effect) resume_effect(catch_effect);
          else catch_effect = branch(() => catch_fn(anchor, error_source));
        }
        if (state2 !== PENDING && pending_effect) {
          pause_effect(pending_effect, () => pending_effect = null);
        }
        if (state2 !== THEN && then_effect) {
          pause_effect(then_effect, () => then_effect = null);
        }
        if (state2 !== CATCH && catch_effect) {
          pause_effect(catch_effect, () => catch_effect = null);
        }
      } finally {
        if (restore) {
          set_component_context(null);
          set_active_reaction(null);
          set_active_effect(null);
          flushSync();
        }
      }
    }
    var effect2 = block(() => {
      if (input === (input = get_input())) return;
      let mismatch = hydrating && is_promise(input) === (anchor.data === HYDRATION_START_ELSE);
      if (mismatch) {
        anchor = remove_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
      if (is_promise(input)) {
        var promise = input;
        resolved = false;
        promise.then(
          (value) => {
            if (promise !== input) return;
            internal_set(input_source, value);
            update2(THEN, true);
          },
          (error) => {
            if (promise !== input) return;
            internal_set(error_source, error);
            update2(CATCH, true);
            if (!catch_fn) {
              throw error_source.v;
            }
          }
        );
        if (hydrating) {
          if (pending_fn) {
            pending_effect = branch(() => pending_fn(anchor));
          }
        } else {
          queue_micro_task(() => {
            if (!resolved) update2(PENDING, true);
          });
        }
      } else {
        internal_set(input_source, input);
        update2(THEN, false);
      }
      if (mismatch) {
        set_hydrating(true);
      }
      return () => input = UNINITIALIZED;
    });
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function if_block(node, fn, elseif = false) {
    if (hydrating) {
      hydrate_next();
    }
    var anchor = node;
    var consequent_effect = null;
    var alternate_effect = null;
    var condition = UNINITIALIZED;
    var flags = elseif ? EFFECT_TRANSPARENT : 0;
    var has_branch = false;
    const set_branch = (fn2, flag = true) => {
      has_branch = true;
      update_branch(flag, fn2);
    };
    var offscreen_fragment = null;
    function commit() {
      if (offscreen_fragment !== null) {
        offscreen_fragment.lastChild.remove();
        anchor.before(offscreen_fragment);
        offscreen_fragment = null;
      }
      var active = condition ? consequent_effect : alternate_effect;
      var inactive = condition ? alternate_effect : consequent_effect;
      if (active) {
        resume_effect(active);
      }
      if (inactive) {
        pause_effect(inactive, () => {
          if (condition) {
            alternate_effect = null;
          } else {
            consequent_effect = null;
          }
        });
      }
    }
    const update_branch = (new_condition, fn2) => {
      if (condition === (condition = new_condition)) return;
      let mismatch = false;
      if (hydrating) {
        const is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;
        if (!!condition === is_else) {
          anchor = remove_nodes();
          set_hydrate_node(anchor);
          set_hydrating(false);
          mismatch = true;
        }
      }
      var defer = should_defer_append();
      var target = anchor;
      if (defer) {
        offscreen_fragment = document.createDocumentFragment();
        offscreen_fragment.append(target = create_text());
      }
      if (condition) {
        consequent_effect ??= fn2 && branch(() => fn2(target));
      } else {
        alternate_effect ??= fn2 && branch(() => fn2(target));
      }
      if (defer) {
        var batch = (
          /** @type {Batch} */
          current_batch
        );
        var active = condition ? consequent_effect : alternate_effect;
        var inactive = condition ? alternate_effect : consequent_effect;
        if (active) batch.skipped_effects.delete(active);
        if (inactive) batch.skipped_effects.add(inactive);
        batch.add_callback(commit);
      } else {
        commit();
      }
      if (mismatch) {
        set_hydrating(true);
      }
    };
    block(() => {
      has_branch = false;
      fn(set_branch);
      if (!has_branch) {
        update_branch(null, null);
      }
    }, flags);
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function key$1(node, get_key, render_fn) {
    if (hydrating) {
      hydrate_next();
    }
    var anchor = node;
    var key2 = UNINITIALIZED;
    var effect2;
    var pending_effect;
    var offscreen_fragment = null;
    var changed = is_runes() ? not_equal : safe_not_equal;
    function commit() {
      if (effect2) {
        pause_effect(effect2);
      }
      if (offscreen_fragment !== null) {
        offscreen_fragment.lastChild.remove();
        anchor.before(offscreen_fragment);
        offscreen_fragment = null;
      }
      effect2 = pending_effect;
    }
    block(() => {
      if (changed(key2, key2 = get_key())) {
        var target = anchor;
        var defer = should_defer_append();
        if (defer) {
          offscreen_fragment = document.createDocumentFragment();
          offscreen_fragment.append(target = create_text());
        }
        pending_effect = branch(() => render_fn(target));
        if (defer) {
          current_batch.add_callback(commit);
        } else {
          commit();
        }
      }
    });
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function index(_, i) {
    return i;
  }
  function pause_effects(state2, items, controlled_anchor) {
    var items_map = state2.items;
    var transitions = [];
    var length = items.length;
    for (var i = 0; i < length; i++) {
      pause_children(items[i].e, transitions, true);
    }
    var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        /** @type {Element} */
        controlled_anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(
        /** @type {Element} */
        controlled_anchor
      );
      items_map.clear();
      link(state2, items[0].prev, items[length - 1].next);
    }
    run_out_transitions(transitions, () => {
      for (var i2 = 0; i2 < length; i2++) {
        var item = items[i2];
        if (!is_controlled) {
          items_map.delete(item.k);
          link(state2, item.prev, item.next);
        }
        destroy_effect(item.e, !is_controlled);
      }
    });
  }
  function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
    var anchor = node;
    var state2 = { flags, items: /* @__PURE__ */ new Map(), first: null };
    var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        node
      );
      anchor = hydrating ? set_hydrate_node(
        /** @type {Comment | Text} */
        /* @__PURE__ */ get_first_child(parent_node)
      ) : parent_node.appendChild(create_text());
    }
    if (hydrating) {
      hydrate_next();
    }
    var fallback = null;
    var was_empty = false;
    var offscreen_items = /* @__PURE__ */ new Map();
    var each_array = /* @__PURE__ */ derived_safe_equal(() => {
      var collection = get_collection();
      return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
    });
    var array;
    var each_effect;
    function commit() {
      reconcile(
        each_effect,
        array,
        state2,
        offscreen_items,
        anchor,
        render_fn,
        flags,
        get_key,
        get_collection
      );
      if (fallback_fn !== null) {
        if (array.length === 0) {
          if (fallback) {
            resume_effect(fallback);
          } else {
            fallback = branch(() => fallback_fn(anchor));
          }
        } else if (fallback !== null) {
          pause_effect(fallback, () => {
            fallback = null;
          });
        }
      }
    }
    block(() => {
      each_effect ??= /** @type {Effect} */
      active_effect;
      array = get$1(each_array);
      var length = array.length;
      if (was_empty && length === 0) {
        return;
      }
      was_empty = length === 0;
      let mismatch = false;
      if (hydrating) {
        var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;
        if (is_else !== (length === 0)) {
          anchor = remove_nodes();
          set_hydrate_node(anchor);
          set_hydrating(false);
          mismatch = true;
        }
      }
      if (hydrating) {
        var prev2 = null;
        var item;
        for (var i = 0; i < length; i++) {
          if (hydrate_node.nodeType === COMMENT_NODE && /** @type {Comment} */
          hydrate_node.data === HYDRATION_END) {
            anchor = /** @type {Comment} */
            hydrate_node;
            mismatch = true;
            set_hydrating(false);
            break;
          }
          var value = array[i];
          var key2 = get_key(value, i);
          item = create_item(
            hydrate_node,
            state2,
            prev2,
            null,
            value,
            key2,
            i,
            render_fn,
            flags,
            get_collection
          );
          state2.items.set(key2, item);
          prev2 = item;
        }
        if (length > 0) {
          set_hydrate_node(remove_nodes());
        }
      }
      if (hydrating) {
        if (length === 0 && fallback_fn) {
          fallback = branch(() => fallback_fn(anchor));
        }
      } else {
        if (should_defer_append()) {
          var keys = /* @__PURE__ */ new Set();
          var batch = (
            /** @type {Batch} */
            current_batch
          );
          for (i = 0; i < length; i += 1) {
            value = array[i];
            key2 = get_key(value, i);
            var existing = state2.items.get(key2) ?? offscreen_items.get(key2);
            if (existing) {
              if ((flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0) {
                update_item(existing, value, i, flags);
              }
            } else {
              item = create_item(
                null,
                state2,
                null,
                null,
                value,
                key2,
                i,
                render_fn,
                flags,
                get_collection,
                true
              );
              offscreen_items.set(key2, item);
            }
            keys.add(key2);
          }
          for (const [key3, item2] of state2.items) {
            if (!keys.has(key3)) {
              batch.skipped_effects.add(item2.e);
            }
          }
          batch.add_callback(commit);
        } else {
          commit();
        }
      }
      if (mismatch) {
        set_hydrating(true);
      }
      get$1(each_array);
    });
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function reconcile(each_effect, array, state2, offscreen_items, anchor, render_fn, flags, get_key, get_collection) {
    var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
    var should_update = (flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;
    var length = array.length;
    var items = state2.items;
    var first = state2.first;
    var current2 = first;
    var seen;
    var prev2 = null;
    var to_animate;
    var matched = [];
    var stashed = [];
    var value;
    var key2;
    var item;
    var i;
    if (is_animated) {
      for (i = 0; i < length; i += 1) {
        value = array[i];
        key2 = get_key(value, i);
        item = items.get(key2);
        if (item !== void 0) {
          item.a?.measure();
          (to_animate ??= /* @__PURE__ */ new Set()).add(item);
        }
      }
    }
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key2 = get_key(value, i);
      item = items.get(key2);
      if (item === void 0) {
        var pending = offscreen_items.get(key2);
        if (pending !== void 0) {
          offscreen_items.delete(key2);
          items.set(key2, pending);
          var next2 = prev2 ? prev2.next : current2;
          link(state2, prev2, pending);
          link(state2, pending, next2);
          move(pending, next2, anchor);
          prev2 = pending;
        } else {
          var child_anchor = current2 ? (
            /** @type {TemplateNode} */
            current2.e.nodes_start
          ) : anchor;
          prev2 = create_item(
            child_anchor,
            state2,
            prev2,
            prev2 === null ? state2.first : prev2.next,
            value,
            key2,
            i,
            render_fn,
            flags,
            get_collection
          );
        }
        items.set(key2, prev2);
        matched = [];
        stashed = [];
        current2 = prev2.next;
        continue;
      }
      if (should_update) {
        update_item(item, value, i, flags);
      }
      if ((item.e.f & INERT) !== 0) {
        resume_effect(item.e);
        if (is_animated) {
          item.a?.unfix();
          (to_animate ??= /* @__PURE__ */ new Set()).delete(item);
        }
      }
      if (item !== current2) {
        if (seen !== void 0 && seen.has(item)) {
          if (matched.length < stashed.length) {
            var start = stashed[0];
            var j;
            prev2 = start.prev;
            var a = matched[0];
            var b = matched[matched.length - 1];
            for (j = 0; j < matched.length; j += 1) {
              move(matched[j], start, anchor);
            }
            for (j = 0; j < stashed.length; j += 1) {
              seen.delete(stashed[j]);
            }
            link(state2, a.prev, b.next);
            link(state2, prev2, a);
            link(state2, b, start);
            current2 = start;
            prev2 = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen.delete(item);
            move(item, current2, anchor);
            link(state2, item.prev, item.next);
            link(state2, item, prev2 === null ? state2.first : prev2.next);
            link(state2, prev2, item);
            prev2 = item;
          }
          continue;
        }
        matched = [];
        stashed = [];
        while (current2 !== null && current2.k !== key2) {
          if ((current2.e.f & INERT) === 0) {
            (seen ??= /* @__PURE__ */ new Set()).add(current2);
          }
          stashed.push(current2);
          current2 = current2.next;
        }
        if (current2 === null) {
          continue;
        }
        item = current2;
      }
      matched.push(item);
      prev2 = item;
      current2 = item.next;
    }
    if (current2 !== null || seen !== void 0) {
      var to_destroy = seen === void 0 ? [] : array_from(seen);
      while (current2 !== null) {
        if ((current2.e.f & INERT) === 0) {
          to_destroy.push(current2);
        }
        current2 = current2.next;
      }
      var destroy_length = to_destroy.length;
      if (destroy_length > 0) {
        var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
        if (is_animated) {
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].a?.measure();
          }
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].a?.fix();
          }
        }
        pause_effects(state2, to_destroy, controlled_anchor);
      }
    }
    if (is_animated) {
      queue_micro_task(() => {
        if (to_animate === void 0) return;
        for (item of to_animate) {
          item.a?.apply();
        }
      });
    }
    each_effect.first = state2.first && state2.first.e;
    each_effect.last = prev2 && prev2.e;
    for (var unused of offscreen_items.values()) {
      destroy_effect(unused.e);
    }
    offscreen_items.clear();
  }
  function update_item(item, value, index2, type) {
    if ((type & EACH_ITEM_REACTIVE) !== 0) {
      internal_set(item.v, value);
    }
    if ((type & EACH_INDEX_REACTIVE) !== 0) {
      internal_set(
        /** @type {Value<number>} */
        item.i,
        index2
      );
    } else {
      item.i = index2;
    }
  }
  function create_item(anchor, state2, prev2, next2, value, key2, index2, render_fn, flags, get_collection, deferred2) {
    var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
    var mutable = (flags & EACH_ITEM_IMMUTABLE) === 0;
    var v = reactive ? mutable ? /* @__PURE__ */ mutable_source(value, false, false) : source$1(value) : value;
    var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index2 : source$1(index2);
    var item = {
      i,
      v,
      k: key2,
      a: null,
      // @ts-expect-error
      e: null,
      prev: prev2,
      next: next2
    };
    try {
      if (anchor === null) {
        var fragment = document.createDocumentFragment();
        fragment.append(anchor = create_text());
      }
      item.e = branch(() => render_fn(
        /** @type {Node} */
        anchor,
        v,
        i,
        get_collection
      ), hydrating);
      item.e.prev = prev2 && prev2.e;
      item.e.next = next2 && next2.e;
      if (prev2 === null) {
        if (!deferred2) {
          state2.first = item;
        }
      } else {
        prev2.next = item;
        prev2.e.next = item.e;
      }
      if (next2 !== null) {
        next2.prev = item;
        next2.e.prev = item.e;
      }
      return item;
    } finally {
    }
  }
  function move(item, next2, anchor) {
    var end = item.next ? (
      /** @type {TemplateNode} */
      item.next.e.nodes_start
    ) : anchor;
    var dest = next2 ? (
      /** @type {TemplateNode} */
      next2.e.nodes_start
    ) : anchor;
    var node = (
      /** @type {TemplateNode} */
      item.e.nodes_start
    );
    while (node !== null && node !== end) {
      var next_node = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      dest.before(node);
      node = next_node;
    }
  }
  function link(state2, prev2, next2) {
    if (prev2 === null) {
      state2.first = next2;
    } else {
      prev2.next = next2;
      prev2.e.next = next2 && next2.e;
    }
    if (next2 !== null) {
      next2.prev = prev2;
      next2.e.prev = prev2 && prev2.e;
    }
  }
  function component(node, get_component, render_fn) {
    if (hydrating) {
      hydrate_next();
    }
    var anchor = node;
    var component2;
    var effect2;
    var offscreen_fragment = null;
    var pending_effect = null;
    function commit() {
      if (effect2) {
        pause_effect(effect2);
        effect2 = null;
      }
      if (offscreen_fragment) {
        offscreen_fragment.lastChild.remove();
        anchor.before(offscreen_fragment);
        offscreen_fragment = null;
      }
      effect2 = pending_effect;
      pending_effect = null;
    }
    block(() => {
      if (component2 === (component2 = get_component())) return;
      var defer = should_defer_append();
      if (component2) {
        var target = anchor;
        if (defer) {
          offscreen_fragment = document.createDocumentFragment();
          offscreen_fragment.append(target = create_text());
        }
        pending_effect = branch(() => render_fn(target, component2));
      }
      if (defer) {
        current_batch.add_callback(commit);
      } else {
        commit();
      }
    }, EFFECT_TRANSPARENT);
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function append_styles$1(anchor, css) {
    queue_micro_task(() => {
      var root2 = anchor.getRootNode();
      var target = (
        /** @type {ShadowRoot} */
        root2.host ? (
          /** @type {ShadowRoot} */
          root2
        ) : (
          /** @type {Document} */
          root2.head ?? /** @type {Document} */
          root2.ownerDocument.head
        )
      );
      if (!target.querySelector("#" + css.hash)) {
        const style = document.createElement("style");
        style.id = css.hash;
        style.textContent = css.code;
        target.appendChild(style);
      }
    });
  }
  function attach(node, get_fn) {
    var fn = void 0;
    var e;
    block(() => {
      if (fn !== (fn = get_fn())) {
        if (e) {
          destroy_effect(e);
          e = null;
        }
        if (fn) {
          e = branch(() => {
            effect(() => (
              /** @type {(node: Element) => void} */
              fn(node)
            ));
          });
        }
      }
    });
  }
  const whitespace = [..." 	\n\r\f \v\uFEFF"];
  function to_class(value, hash, directives) {
    var classname = value == null ? "" : "" + value;
    if (hash) {
      classname = classname ? classname + " " + hash : hash;
    }
    if (directives) {
      for (var key2 in directives) {
        if (directives[key2]) {
          classname = classname ? classname + " " + key2 : key2;
        } else if (classname.length) {
          var len = key2.length;
          var a = 0;
          while ((a = classname.indexOf(key2, a)) >= 0) {
            var b = a + len;
            if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
              classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
            } else {
              a = b;
            }
          }
        }
      }
    }
    return classname === "" ? null : classname;
  }
  function append_styles(styles, important = false) {
    var separator = important ? " !important;" : ";";
    var css = "";
    for (var key2 in styles) {
      var value = styles[key2];
      if (value != null && value !== "") {
        css += " " + key2 + ": " + value + separator;
      }
    }
    return css;
  }
  function to_css_name(name) {
    if (name[0] !== "-" || name[1] !== "-") {
      return name.toLowerCase();
    }
    return name;
  }
  function to_style(value, styles) {
    if (styles) {
      var new_style = "";
      var normal_styles;
      var important_styles;
      if (Array.isArray(styles)) {
        normal_styles = styles[0];
        important_styles = styles[1];
      } else {
        normal_styles = styles;
      }
      if (value) {
        value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
        var in_str = false;
        var in_apo = 0;
        var in_comment = false;
        var reserved_names = [];
        if (normal_styles) {
          reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
        }
        if (important_styles) {
          reserved_names.push(...Object.keys(important_styles).map(to_css_name));
        }
        var start_index = 0;
        var name_index = -1;
        const len = value.length;
        for (var i = 0; i < len; i++) {
          var c2 = value[i];
          if (in_comment) {
            if (c2 === "/" && value[i - 1] === "*") {
              in_comment = false;
            }
          } else if (in_str) {
            if (in_str === c2) {
              in_str = false;
            }
          } else if (c2 === "/" && value[i + 1] === "*") {
            in_comment = true;
          } else if (c2 === '"' || c2 === "'") {
            in_str = c2;
          } else if (c2 === "(") {
            in_apo++;
          } else if (c2 === ")") {
            in_apo--;
          }
          if (!in_comment && in_str === false && in_apo === 0) {
            if (c2 === ":" && name_index === -1) {
              name_index = i;
            } else if (c2 === ";" || i === len - 1) {
              if (name_index !== -1) {
                var name = to_css_name(value.substring(start_index, name_index).trim());
                if (!reserved_names.includes(name)) {
                  if (c2 !== ";") {
                    i++;
                  }
                  var property = value.substring(start_index, i).trim();
                  new_style += " " + property + ";";
                }
              }
              start_index = i + 1;
              name_index = -1;
            }
          }
        }
      }
      if (normal_styles) {
        new_style += append_styles(normal_styles);
      }
      if (important_styles) {
        new_style += append_styles(important_styles, true);
      }
      new_style = new_style.trim();
      return new_style === "" ? null : new_style;
    }
    return value == null ? null : String(value);
  }
  function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
    var prev2 = dom.__className;
    if (hydrating || prev2 !== value || prev2 === void 0) {
      var next_class_name = to_class(value, hash, next_classes);
      if (!hydrating || next_class_name !== dom.getAttribute("class")) {
        if (next_class_name == null) {
          dom.removeAttribute("class");
        } else {
          dom.className = next_class_name;
        }
      }
      dom.__className = value;
    } else if (next_classes && prev_classes !== next_classes) {
      for (var key2 in next_classes) {
        var is_present = !!next_classes[key2];
        if (prev_classes == null || is_present !== !!prev_classes[key2]) {
          dom.classList.toggle(key2, is_present);
        }
      }
    }
    return next_classes;
  }
  function update_styles(dom, prev2 = {}, next2, priority) {
    for (var key2 in next2) {
      var value = next2[key2];
      if (prev2[key2] !== value) {
        if (next2[key2] == null) {
          dom.style.removeProperty(key2);
        } else {
          dom.style.setProperty(key2, value, priority);
        }
      }
    }
  }
  function set_style(dom, value, prev_styles, next_styles) {
    var prev2 = dom.__style;
    if (hydrating || prev2 !== value) {
      var next_style_attr = to_style(value, next_styles);
      if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
        if (next_style_attr == null) {
          dom.removeAttribute("style");
        } else {
          dom.style.cssText = next_style_attr;
        }
      }
      dom.__style = value;
    } else if (next_styles) {
      if (Array.isArray(next_styles)) {
        update_styles(dom, prev_styles?.[0], next_styles[0]);
        update_styles(dom, prev_styles?.[1], next_styles[1], "important");
      } else {
        update_styles(dom, prev_styles, next_styles);
      }
    }
    return next_styles;
  }
  const IS_CUSTOM_ELEMENT = Symbol("is custom element");
  const IS_HTML = Symbol("is html");
  function set_value(element, value) {
    var attributes = get_attributes(element);
    if (attributes.value === (attributes.value = // treat null and undefined the same for the initial value
    value) || // @ts-expect-error
    // `progress` elements always need their value set when it's `0`
    element.value === value && value !== 0) {
      return;
    }
    element.value = value;
  }
  function set_attribute(element, attribute, value, skip_warning) {
    var attributes = get_attributes(element);
    if (hydrating) {
      attributes[attribute] = element.getAttribute(attribute);
      if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === "LINK") {
        return;
      }
    }
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (attribute === "loading") {
      element[LOADING_ATTR_SYMBOL] = value;
    }
    if (value == null) {
      element.removeAttribute(attribute);
    } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
      element[attribute] = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
  function get_attributes(element) {
    return (
      /** @type {Record<string | symbol, unknown>} **/
      // @ts-expect-error
      element.__attributes ??= {
        [IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
        [IS_HTML]: element.namespaceURI === NAMESPACE_HTML
      }
    );
  }
  var setters_cache = /* @__PURE__ */ new Map();
  function get_setters(element) {
    var setters = setters_cache.get(element.nodeName);
    if (setters) return setters;
    setters_cache.set(element.nodeName, setters = []);
    var descriptors;
    var proto = element;
    var element_proto = Element.prototype;
    while (element_proto !== proto) {
      descriptors = get_descriptors(proto);
      for (var key2 in descriptors) {
        if (descriptors[key2].set) {
          setters.push(key2);
        }
      }
      proto = get_prototype_of(proto);
    }
    return setters;
  }
  function is_bound_this(bound_value, element_or_component) {
    return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
  }
  function bind_this(element_or_component = {}, update2, get_value, get_parts) {
    effect(() => {
      var old_parts;
      var parts;
      render_effect(() => {
        old_parts = parts;
        parts = [];
        untrack(() => {
          if (element_or_component !== get_value(...parts)) {
            update2(element_or_component, ...parts);
            if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
              update2(null, ...old_parts);
            }
          }
        });
      });
      return () => {
        queue_micro_task(() => {
          if (parts && is_bound_this(get_value(...parts), element_or_component)) {
            update2(null, ...parts);
          }
        });
      };
    });
    return element_or_component;
  }
  function init(immutable = false) {
    const context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    const callbacks = context.l.u;
    if (!callbacks) return;
    let props = () => deep_read_state(context.s);
    if (immutable) {
      let version = 0;
      let prev2 = (
        /** @type {Record<string, any>} */
        {}
      );
      const d = /* @__PURE__ */ derived(() => {
        let changed = false;
        const props2 = context.s;
        for (const key2 in props2) {
          if (props2[key2] !== prev2[key2]) {
            prev2[key2] = props2[key2];
            changed = true;
          }
        }
        if (changed) version++;
        return version;
      });
      props = () => get$1(d);
    }
    if (callbacks.b.length) {
      user_pre_effect(() => {
        observe_all(context, props);
        run_all(callbacks.b);
      });
    }
    user_effect(() => {
      const fns = untrack(() => callbacks.m.map(run));
      return () => {
        for (const fn of fns) {
          if (typeof fn === "function") {
            fn();
          }
        }
      };
    });
    if (callbacks.a.length) {
      user_effect(() => {
        observe_all(context, props);
        run_all(callbacks.a);
      });
    }
  }
  function observe_all(context, props) {
    if (context.l.s) {
      for (const signal of context.l.s) get$1(signal);
    }
    props();
  }
  function subscribe_to_store(store, run2, invalidate) {
    if (store == null) {
      run2(void 0);
      return noop;
    }
    const unsub = untrack(
      () => store.subscribe(
        run2,
        // @ts-expect-error
        invalidate
      )
    );
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  const subscriber_queue = [];
  function writable(value, start = noop) {
    let stop = null;
    const subscribers = /* @__PURE__ */ new Set();
    function set2(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set2(fn(
        /** @type {T} */
        value
      ));
    }
    function subscribe(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set2, update2) || noop;
      }
      run2(
        /** @type {T} */
        value
      );
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0 && stop) {
          stop();
          stop = null;
        }
      };
    }
    return { set: set2, update: update2, subscribe };
  }
  function get(store) {
    let value;
    subscribe_to_store(store, (_) => value = _)();
    return value;
  }
  let IS_UNMOUNTED = Symbol();
  function store_get(store, store_name, stores) {
    const entry = stores[store_name] ??= {
      store: null,
      source: /* @__PURE__ */ mutable_source(void 0),
      unsubscribe: noop
    };
    if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
      entry.unsubscribe();
      entry.store = store ?? null;
      if (store == null) {
        entry.source.v = void 0;
        entry.unsubscribe = noop;
      } else {
        var is_synchronous_callback = true;
        entry.unsubscribe = subscribe_to_store(store, (v) => {
          if (is_synchronous_callback) {
            entry.source.v = v;
          } else {
            set(entry.source, v);
          }
        });
        is_synchronous_callback = false;
      }
    }
    if (store && IS_UNMOUNTED in stores) {
      return get(store);
    }
    return get$1(entry.source);
  }
  function setup_stores() {
    const stores = {};
    function cleanup() {
      teardown(() => {
        for (var store_name in stores) {
          const ref = stores[store_name];
          ref.unsubscribe();
        }
        define_property(stores, IS_UNMOUNTED, {
          enumerable: false,
          value: true
        });
      });
    }
    return [stores, cleanup];
  }
  const rest_props_handler = {
    get(target, key2) {
      if (target.exclude.includes(key2)) return;
      return target.props[key2];
    },
    set(target, key2) {
      return false;
    },
    getOwnPropertyDescriptor(target, key2) {
      if (target.exclude.includes(key2)) return;
      if (key2 in target.props) {
        return {
          enumerable: true,
          configurable: true,
          value: target.props[key2]
        };
      }
    },
    has(target, key2) {
      if (target.exclude.includes(key2)) return false;
      return key2 in target.props;
    },
    ownKeys(target) {
      return Reflect.ownKeys(target.props).filter((key2) => !target.exclude.includes(key2));
    }
  };
  // @__NO_SIDE_EFFECTS__
  function rest_props(props, exclude, name) {
    return new Proxy(
      { props, exclude },
      rest_props_handler
    );
  }
  const spread_props_handler = {
    get(target, key2) {
      let i = target.props.length;
      while (i--) {
        let p = target.props[i];
        if (is_function(p)) p = p();
        if (typeof p === "object" && p !== null && key2 in p) return p[key2];
      }
    },
    set(target, key2, value) {
      let i = target.props.length;
      while (i--) {
        let p = target.props[i];
        if (is_function(p)) p = p();
        const desc = get_descriptor(p, key2);
        if (desc && desc.set) {
          desc.set(value);
          return true;
        }
      }
      return false;
    },
    getOwnPropertyDescriptor(target, key2) {
      let i = target.props.length;
      while (i--) {
        let p = target.props[i];
        if (is_function(p)) p = p();
        if (typeof p === "object" && p !== null && key2 in p) {
          const descriptor = get_descriptor(p, key2);
          if (descriptor && !descriptor.configurable) {
            descriptor.configurable = true;
          }
          return descriptor;
        }
      }
    },
    has(target, key2) {
      if (key2 === STATE_SYMBOL || key2 === LEGACY_PROPS) return false;
      for (let p of target.props) {
        if (is_function(p)) p = p();
        if (p != null && key2 in p) return true;
      }
      return false;
    },
    ownKeys(target) {
      const keys = [];
      for (let p of target.props) {
        if (is_function(p)) p = p();
        if (!p) continue;
        for (const key2 in p) {
          if (!keys.includes(key2)) keys.push(key2);
        }
        for (const key2 of Object.getOwnPropertySymbols(p)) {
          if (!keys.includes(key2)) keys.push(key2);
        }
      }
      return keys;
    }
  };
  function spread_props(...props) {
    return new Proxy({ props }, spread_props_handler);
  }
  function prop(props, key2, flags, fallback) {
    var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
    var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
    var fallback_value = (
      /** @type {V} */
      fallback
    );
    var fallback_dirty = true;
    var get_fallback = () => {
      if (fallback_dirty) {
        fallback_dirty = false;
        fallback_value = /** @type {V} */
        fallback;
      }
      return fallback_value;
    };
    var initial_value;
    {
      initial_value = /** @type {V} */
      props[key2];
    }
    if (initial_value === void 0 && fallback !== void 0) {
      initial_value = get_fallback();
    }
    var getter;
    if (runes) {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key2]
        );
        if (value === void 0) return get_fallback();
        fallback_dirty = true;
        return value;
      };
    } else {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key2]
        );
        if (value !== void 0) {
          fallback_value = /** @type {V} */
          void 0;
        }
        return value === void 0 ? fallback_value : value;
      };
    }
    if (runes && (flags & PROPS_IS_UPDATED) === 0) {
      return getter;
    }
    var overridden = false;
    var d = /* @__PURE__ */ derived(() => {
      overridden = false;
      return getter();
    });
    var parent_effect = (
      /** @type {Effect} */
      active_effect
    );
    return function(value, mutation) {
      if (arguments.length > 0) {
        const new_value = mutation ? get$1(d) : runes && bindable ? proxy(value) : value;
        set(d, new_value);
        overridden = true;
        if (fallback_value !== void 0) {
          fallback_value = new_value;
        }
        return value;
      }
      if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
        return d.v;
      }
      return get$1(d);
    };
  }
  function createClassComponent(options) {
    return new Svelte4Component(options);
  }
  class Svelte4Component {
    /** @type {any} */
    #events;
    /** @type {Record<string, any>} */
    #instance;
    /**
     * @param {ComponentConstructorOptions & {
     *  component: any;
     * }} options
     */
    constructor(options) {
      var sources = /* @__PURE__ */ new Map();
      var add_source = (key2, value) => {
        var s = /* @__PURE__ */ mutable_source(value, false, false);
        sources.set(key2, s);
        return s;
      };
      const props = new Proxy(
        { ...options.props || {}, $$events: {} },
        {
          get(target, prop2) {
            return get$1(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          },
          has(target, prop2) {
            if (prop2 === LEGACY_PROPS) return true;
            get$1(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
            return Reflect.has(target, prop2);
          },
          set(target, prop2, value) {
            set(sources.get(prop2) ?? add_source(prop2, value), value);
            return Reflect.set(target, prop2, value);
          }
        }
      );
      this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
        target: options.target,
        anchor: options.anchor,
        props,
        context: options.context,
        intro: options.intro ?? false,
        recover: options.recover
      });
      if (!options?.props?.$$host || options.sync === false) {
        flushSync();
      }
      this.#events = props.$$events;
      for (const key2 of Object.keys(this.#instance)) {
        if (key2 === "$set" || key2 === "$destroy" || key2 === "$on") continue;
        define_property(this, key2, {
          get() {
            return this.#instance[key2];
          },
          /** @param {any} value */
          set(value) {
            this.#instance[key2] = value;
          },
          enumerable: true
        });
      }
      this.#instance.$set = /** @param {Record<string, any>} next */
      (next2) => {
        Object.assign(props, next2);
      };
      this.#instance.$destroy = () => {
        unmount(this.#instance);
      };
    }
    /** @param {Record<string, any>} props */
    $set(props) {
      this.#instance.$set(props);
    }
    /**
     * @param {string} event
     * @param {(...args: any[]) => any} callback
     * @returns {any}
     */
    $on(event2, callback) {
      this.#events[event2] = this.#events[event2] || [];
      const cb = (...args) => callback.call(this, ...args);
      this.#events[event2].push(cb);
      return () => {
        this.#events[event2] = this.#events[event2].filter(
          /** @param {any} fn */
          (fn) => fn !== cb
        );
      };
    }
    $destroy() {
      this.#instance.$destroy();
    }
  }
  let SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /** The Svelte component constructor */
      $$ctor;
      /** Slots */
      $$s;
      /** @type {any} The Svelte component instance */
      $$c;
      /** Whether or not the custom element is connected */
      $$cn = false;
      /** @type {Record<string, any>} Component props data */
      $$d = {};
      /** `true` if currently in the process of reflecting component props back to attributes */
      $$r = false;
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      $$p_d = {};
      /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
      $$l = {};
      /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
      $$l_u = /* @__PURE__ */ new Map();
      /** @type {any} The managed render effect for reflecting attributes */
      $$me;
      /**
       * @param {*} $$componentCtor
       * @param {*} $$slots
       * @param {*} use_shadow_dom
       */
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      /**
       * @param {string} type
       * @param {EventListenerOrEventListenerObject} listener
       * @param {boolean | AddEventListenerOptions} [options]
       */
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      /**
       * @param {string} type
       * @param {EventListenerOrEventListenerObject} listener
       * @param {boolean | AddEventListenerOptions} [options]
       */
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot = function(name) {
            return (anchor) => {
              const slot = document.createElement("slot");
              if (name !== "default") slot.name = name;
              append(anchor, slot);
            };
          };
          await Promise.resolve();
          if (!this.$$cn || this.$$c) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              if (name === "default" && !this.$$d.children) {
                this.$$d.children = create_slot(name);
                $$slots.default = true;
              } else {
                $$slots[name] = create_slot(name);
              }
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          for (const key2 in this.$$p_d) {
            if (!(key2 in this.$$d) && this[key2] !== void 0) {
              this.$$d[key2] = this[key2];
              delete this[key2];
            }
          }
          this.$$c = createClassComponent({
            component: this.$$ctor,
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$host: this
            }
          });
          this.$$me = effect_root(() => {
            render_effect(() => {
              this.$$r = true;
              for (const key2 of object_keys(this.$$c)) {
                if (!this.$$p_d[key2]?.reflect) continue;
                this.$$d[key2] = this.$$c[key2];
                const attribute_value = get_custom_element_value(
                  key2,
                  this.$$d[key2],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(this.$$p_d[key2].attribute || key2);
                } else {
                  this.setAttribute(this.$$p_d[key2].attribute || key2, attribute_value);
                }
              }
              this.$$r = false;
            });
          });
          for (const type in this.$$l) {
            for (const listener of this.$$l[type]) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      /**
       * @param {string} attr
       * @param {string} _oldValue
       * @param {string} newValue
       */
      attributeChangedCallback(attr, _oldValue, newValue) {
        if (this.$$r) return;
        attr = this.$$g_p(attr);
        this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr]: this.$$d[attr] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn && this.$$c) {
            this.$$c.$destroy();
            this.$$me();
            this.$$c = void 0;
          }
        });
      }
      /**
       * @param {string} attribute_name
       */
      $$g_p(attribute_name) {
        return object_keys(this.$$p_d).find(
          (key2) => this.$$p_d[key2].attribute === attribute_name || !this.$$p_d[key2].attribute && key2.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop2, value, props_definition, transform) {
    const type = props_definition[prop2]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop2]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        // conversion already handled above
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
      result[
        /** @type {Element} node */
        node.slot || "default"
      ] = true;
    });
    return result;
  }
  function create_custom_element(Component, props_definition, slots, exports, use_shadow_dom, extend) {
    let Class = class extends SvelteElement {
      constructor() {
        super(Component, slots, use_shadow_dom);
        this.$$p_d = props_definition;
      }
      static get observedAttributes() {
        return object_keys(props_definition).map(
          (key2) => (props_definition[key2].attribute || key2).toLowerCase()
        );
      }
    };
    object_keys(props_definition).forEach((prop2) => {
      define_property(Class.prototype, prop2, {
        get() {
          return this.$$c && prop2 in this.$$c ? this.$$c[prop2] : this.$$d[prop2];
        },
        set(value) {
          value = get_custom_element_value(prop2, value, props_definition);
          this.$$d[prop2] = value;
          var component2 = this.$$c;
          if (component2) {
            var setter = get_descriptor(component2, prop2)?.get;
            if (setter) {
              component2[prop2] = value;
            } else {
              component2.$set({ [prop2]: value });
            }
          }
        }
      });
    });
    exports.forEach((property) => {
      define_property(Class.prototype, property, {
        get() {
          return this.$$c?.[property];
        }
      });
    });
    Component.element = /** @type {any} */
    Class;
    return Class;
  }
  const VERSION = "0.17.6";
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined") {
    ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(PUBLIC_VERSION);
  }
  var root$B = /* @__PURE__ */ from_html(`<div></div>`);
  function WithTailwind($$anchor, $$props) {
    push$1($$props, true);
    let self2;
    user_effect(() => addToMyRoot(self2, ["tailwind", "daisy-ui"]));
    var div = root$B();
    bind_this(div, ($$value) => self2 = $$value, () => self2);
    append($$anchor, div);
    pop$1();
  }
  create_custom_element(WithTailwind, {}, [], [], true);
  const myCodespace = (() => {
    const prefix = "fantastic-winner";
    const myCsName = "fantastic-winner-vg5x4x4wj35qw";
    let myCsName2 = typeof _$gebemot_localConfig !== "undefined" && _$gebemot_localConfig ? _$gebemot_localConfig.myCsName : "";
    let forwards = {
      "http://localhost:5000": `https://${myCsName2}-5000.app.github.dev`,
      "http://localhost:5174": `https://${myCsName2}-5174.app.github.dev`
    };
    return {
      applyForwarding(url) {
        if (!myCsName2) return url;
        for (let [local, mapTo] of Object.entries(forwards)) {
          if (!url.includes(local)) continue;
          return url.replace(local, mapTo);
        }
        return url;
      },
      referenceDeprecatedVars: `${prefix}/${myCsName}`
    };
  })();
  const fwd = (url) => myCodespace.applyForwarding(url);
  const backend = /* @__PURE__ */ (() => {
    const noLogsFor = ["keep-alive"];
    function log2(msg) {
      for (var no of noLogsFor) {
        if (msg.includes(no)) return;
      }
      console.log(msg);
    }
    async function post(api, data) {
      let base = myCodespace.applyForwarding("http://localhost:5000");
      let bslash = api.startsWith("/") ? "" : "/";
      let url = `${base}${bslash}${api}`;
      let json = data ? JSON.stringify(data) : "{ }";
      try {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: json
        });
      } catch (err) {
        console.log(`BACKEND: failed to post to '${url}'`, err);
      }
    }
    async function get2(api) {
      let base = myCodespace.applyForwarding("http://localhost:5000");
      let bslash = api.startsWith("/") ? "" : "/";
      let url = `${base}${bslash}${api}`;
      log2(`BACKEND: getting from '${url}'`);
      try {
        let response = await fetch(url);
        return await response.text();
      } catch (err) {
        console.log(`BACKEND: get failed: '${url}'`, err);
        return void 0;
      }
    }
    let tick = (func) => Promise.resolve().then(func);
    return {
      post: (api, data = void 0) => tick(() => post(api, data)),
      get: get2
    };
  })();
  const sse = /* @__PURE__ */ (() => {
    let _clientId;
    let _connected = false;
    let _listeners = [];
    let _url;
    let _sse;
    function listenTo(listener) {
      _sse.addEventListener(listener.cmd, listener.handler);
      console.log(`SSE: listening for '${listener.cmd}' events...`);
    }
    function startKeepAliveStream(period) {
      let keepAliveNo = 0;
      async function beat() {
        var response = await backend.get(`/sse-keep-alive/${++keepAliveNo}/${_clientId}`);
        if (!response) return;
        if (response.toLowerCase() === "ok") return;
        if (response !== "not-connected") console.log(`SSE: sse-keep-alive: unknown response '${response}', reconnecting`);
        _connected = false;
        connect();
      }
      setInterval(beat, period);
    }
    function connect() {
      if (_connected) return;
      let api = myCodespace.applyForwarding("http://localhost:5000/sse-open");
      _url = `${api}/${_clientId}`;
      console.log(`sse: connectiong to... '${_url}'`);
      _sse = new EventSource(_url);
      _connected = true;
      _sse.onopen = () => console.log("SSE: ✅ Connected to backend");
      _sse.onerror = (e) => console.error("SSE: ❌ Error", e);
      _sse.onmessage = (e) => console.log("SSE: 📩 Default message:", e.data);
      _listeners.forEach(listenTo);
    }
    function init2(clientId) {
      if (_clientId) return;
      _clientId = clientId;
      connect();
      startKeepAliveStream(1e4);
    }
    function addListener(cmd, handler) {
      let listener = {
        cmd,
        handler: (e) => {
          let msg = JSON.parse(e.data);
          handler(msg);
        }
      };
      _listeners.push(listener);
      if (_connected) {
        listenTo(listener);
      }
    }
    return { url: () => _url, init: init2, addListener };
  })();
  const helpers = /* @__PURE__ */ (() => {
    function getFileName(path) {
      return path.replaceAll("\\", "/").split("/").pop();
    }
    function getFileNameWithoutExtension(path) {
      return path.replaceAll("\\", "/").split("/").pop().split(".")[0];
    }
    function makeId(noOfSegments) {
      let chars = "0123456789";
      let segments = [];
      let one = () => chars.charAt(Math.floor(Math.random() * chars.length));
      while (noOfSegments-- > 0) {
        segments.push(`${one()}${one()}`);
      }
      let id = segments.join(".");
      return id;
    }
    return {
      getFileName,
      getFileNameWithoutExtension,
      makeId
    };
  })();
  let myPage = proxy({
    name: "---",
    student: "Gosha Smeh",
    username: "top-pro-78",
    count: 0,
    count2: 0
  });
  let myPage2 = (() => {
    let username = writable("---");
    let name = writable("Student");
    let streak = writable(0);
    let rightsToday = writable(0);
    let branch2 = writable("---");
    let wrongBranch = writable(false);
    let sessionId = helpers.makeId(2);
    let sVersion = writable("---");
    let takeAt = 0;
    function myPageIsHere(msg) {
      console.log("my-page:", msg);
      username.set(msg.username);
      name.set(msg.name);
      streak.set(msg.streak);
      rightsToday.set(msg.rightsToday);
      branch2.set(msg.branch);
      wrongBranch.set(msg.wrongBranch);
      sVersion.set(msg.sVersion);
    }
    function connectToBackend(pagePath) {
      let clientId = `${pagePath}-${sessionId}`;
      sse.init(clientId);
      sse.addListener("my-page", myPageIsHere);
    }
    return {
      username,
      name,
      streak,
      rightsToday,
      branch: branch2,
      wrongBranch,
      sessionId,
      sVersion,
      connectToBackend,
      takeAt: { get: () => takeAt, set: (value) => takeAt = value }
    };
  })();
  var root_1$d = /* @__PURE__ */ from_html(`<div class="badge badge-error badge-xl svelte-o0vjex">Wrong branch</div>`);
  var root$A = /* @__PURE__ */ from_html(`<!> <div class="svelte-o0vjex"><span class="groovy svelte-o0vjex"> </span></div> <div class="svelte-o0vjex"><span class="text-gray-400 svelte-o0vjex">Streak:</span> <span class="streak svelte-o0vjex"> </span> <span class="text-gray-400 svelte-o0vjex">Right answers today:</span> <span class="rightsToday svelte-o0vjex"> </span></div> <div class="svelte-o0vjex"><div class="badge badge-outline badge-primary badge-xl svelte-o0vjex"> </div> <div class="badge badge-warning badge-xl svelte-o0vjex"> </div> <!></div> <div class="badge badge-xl svelte-o0vjex"> </div> <div class="badge badge-xs svelte-o0vjex"> </div> <div class="badge badge-xs svelte-o0vjex"> </div> <div class="badge badge-xs svelte-o0vjex"> </div>`, 1);
  const $$css$s = {
    hash: "svelte-o0vjex",
    code: ".groovy.svelte-o0vjex {font-size:32px;font-weight:bold;display:inline-block;vertical-align:middle;background:linear-gradient(90deg, gold, magenta, cyan);background-size:200%;-webkit-background-clip:text;background-clip:text;color:transparent; \r\n        animation: svelte-o0vjex-shine 5s linear infinite;}.streak.svelte-o0vjex {font-size:36px;font-weight:bold;color:red;}.rightsToday.svelte-o0vjex {font-size:24px;font-weight:bold;color:green;}.groovy.svelte-o0vjex:hover {\r\n        animation: svelte-o0vjex-jelly 0.6s ease-in-out infinite;}\r\n    @keyframes svelte-o0vjex-shine {to{background-position:200%}}\r\n    @keyframes svelte-o0vjex-jelly {25%{transform:scale(1.1,0.9)}50%{transform:scale(0.9,1.1)}75%{transform:scale(1.05,0.95)}}"
  };
  function MyPage($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$s);
    const [$$stores, $$cleanup] = setup_stores();
    const $name = () => store_get(name, "$name", $$stores);
    const $streak = () => store_get(streak, "$streak", $$stores);
    const $rightsToday = () => store_get(rightsToday, "$rightsToday", $$stores);
    const $username = () => store_get(username, "$username", $$stores);
    const $branch = () => store_get(branch2, "$branch", $$stores);
    const $wrongBranch = () => store_get(wrongBranch, "$wrongBranch", $$stores);
    const $sVersion = () => store_get(sVersion, "$sVersion", $$stores);
    let mdArgs = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "$$host"]);
    let { path } = mdArgs;
    let takeAt = Number(mdArgs["take-at"] ?? 0);
    if (!Number.isNaN(takeAt)) {
      myPage2.takeAt.set(takeAt);
    }
    let {
      username,
      name,
      streak,
      rightsToday,
      branch: branch2,
      wrongBranch,
      sessionId,
      sVersion
    } = myPage2;
    myPage2.connectToBackend(path);
    var fragment = root$A();
    var node = first_child(fragment);
    WithTailwind(node, {});
    var div = sibling(node, 2);
    var span = child(div);
    var text2 = child(span);
    reset(span);
    reset(div);
    var div_1 = sibling(div, 2);
    var span_1 = sibling(child(div_1), 2);
    var text_1 = child(span_1, true);
    reset(span_1);
    var span_2 = sibling(span_1, 4);
    var text_2 = child(span_2, true);
    reset(span_2);
    reset(div_1);
    var div_2 = sibling(div_1, 2);
    var div_3 = child(div_2);
    var text_3 = child(div_3, true);
    reset(div_3);
    var div_4 = sibling(div_3, 2);
    var text_4 = child(div_4, true);
    reset(div_4);
    var node_1 = sibling(div_4, 2);
    {
      var consequent = ($$anchor2) => {
        var div_5 = root_1$d();
        append($$anchor2, div_5);
      };
      if_block(node_1, ($$render) => {
        if ($wrongBranch()) $$render(consequent);
      });
    }
    reset(div_2);
    var div_6 = sibling(div_2, 2);
    var text_5 = child(div_6, true);
    reset(div_6);
    var div_7 = sibling(div_6, 2);
    var text_6 = child(div_7, true);
    reset(div_7);
    var div_8 = sibling(div_7, 2);
    var text_7 = child(div_8);
    reset(div_8);
    var div_9 = sibling(div_8, 2);
    var text_8 = child(div_9);
    reset(div_9);
    template_effect(() => {
      set_text(text2, `${$name() ?? ""} שלום`);
      set_text(text_1, $streak() + ($rightsToday() >= 20 ? 1 : 0));
      set_text(text_2, $rightsToday());
      set_text(text_3, $username());
      set_text(text_4, $branch());
      set_text(text_5, path);
      set_text(text_6, sessionId);
      set_text(text_7, `c-${VERSION}`);
      set_text(text_8, `s-${$sVersion() ?? ""}`);
    });
    append($$anchor, fragment);
    pop$1();
    $$cleanup();
  }
  customElements.define("my-page", create_custom_element(MyPage, {}, [], [], false));
  var root$z = /* @__PURE__ */ from_html(`<div></div>`);
  function RunTheHeaderMsg($$anchor, $$props) {
    push$1($$props, true);
    let div;
    user_effect(() => {
      let self2 = div.parentNode;
      self2.innerHTML = "";
    });
    var div_1 = root$z();
    bind_this(div_1, ($$value) => div = $$value, () => div);
    append($$anchor, div_1);
    pop$1();
  }
  customElements.define("run-the-header-msg", create_custom_element(RunTheHeaderMsg, {}, [], [], false));
  function LifecycleHooks($$anchor, $$props) {
    push$1($$props, true);
    let prefix = prop($$props, "prefix", 7, "lifecycle-hooks");
    onMount(() => {
      console.log(`${prefix()}: the component has mounted`);
    });
    onDestroy(() => {
      console.log(`${prefix()}: the component is being destroyed`);
    });
    return pop$1({
      get prefix() {
        return prefix();
      },
      set prefix($$value = "lifecycle-hooks") {
        prefix($$value);
        flushSync();
      }
    });
  }
  customElements.define("lifecycle-hooks", create_custom_element(LifecycleHooks, { prefix: {} }, [], [], false));
  var root$y = /* @__PURE__ */ from_html(`<div> </div>`);
  function Alert($$anchor, $$props) {
    push$1($$props, true);
    let type = prop($$props, "type", 7), message = prop($$props, "message", 7), inline = prop($$props, "inline", 7, false), outline = prop($$props, "outline", 7, false);
    let display = inline() ? "inline-block" : "block";
    let more = outline() ? "badge-outline" : "";
    var div = root$y();
    var text2 = child(div, true);
    reset(div);
    template_effect(() => {
      set_class(div, 1, `badge badge-${type() ?? ""} budge-xl mb-2 mt-2 ${more}`);
      set_style(div, `width:fit-content; display: ${display};`);
      set_text(text2, message());
    });
    append($$anchor, div);
    return pop$1({
      get type() {
        return type();
      },
      set type($$value) {
        type($$value);
        flushSync();
      },
      get message() {
        return message();
      },
      set message($$value) {
        message($$value);
        flushSync();
      },
      get inline() {
        return inline();
      },
      set inline($$value = false) {
        inline($$value);
        flushSync();
      },
      get outline() {
        return outline();
      },
      set outline($$value = false) {
        outline($$value);
        flushSync();
      }
    });
  }
  create_custom_element(Alert, { type: {}, message: {}, inline: {}, outline: {} }, [], [], true);
  var root$x = /* @__PURE__ */ from_html(`<!> <!>`, 1);
  function ShowMsg($$anchor, $$props) {
    push$1($$props, true);
    let type = prop($$props, "type", 7, "info"), msg = prop($$props, "msg", 7);
    var fragment = root$x();
    var node = first_child(fragment);
    WithTailwind(node, {});
    var node_1 = sibling(node, 2);
    Alert(node_1, {
      get type() {
        return type();
      },
      get message() {
        return msg();
      }
    });
    append($$anchor, fragment);
    return pop$1({
      get type() {
        return type();
      },
      set type($$value = "info") {
        type($$value);
        flushSync();
      },
      get msg() {
        return msg();
      },
      set msg($$value) {
        msg($$value);
        flushSync();
      }
    });
  }
  customElements.define("show-msg", create_custom_element(ShowMsg, { type: {}, msg: {} }, [], [], false));
  const btn = ($$anchor, txt = noop, onclick2 = noop) => {
    var button = root_1$c();
    button.__click = function(...$$args) {
      onclick2()?.apply(this, $$args);
    };
    var text2 = child(button, true);
    reset(button);
    template_effect(() => set_text(text2, txt()));
    append($$anchor, button);
  };
  var root_1$c = /* @__PURE__ */ from_html(`<button class="text-2xl px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"> </button>`);
  var root$w = /* @__PURE__ */ from_html(`<!> <!>`, 1);
  function IncDec($$anchor, $$props) {
    push$1($$props, true);
    let inc = prop($$props, "inc", 7), dec = prop($$props, "dec", 7);
    var fragment = root$w();
    var node = first_child(fragment);
    btn(node, () => "+", () => () => inc()());
    var node_1 = sibling(node, 2);
    btn(node_1, () => "-", () => () => dec()());
    append($$anchor, fragment);
    return pop$1({
      get inc() {
        return inc();
      },
      set inc($$value) {
        inc($$value);
        flushSync();
      },
      get dec() {
        return dec();
      },
      set dec($$value) {
        dec($$value);
        flushSync();
      }
    });
  }
  delegate(["click"]);
  create_custom_element(IncDec, { inc: {}, dec: {} }, [], [], true);
  var root$v = /* @__PURE__ */ from_html(`<!> <div class="bg-yellow-100 text-xl rounded" style="width:fit-content"> </div> <!>`, 1);
  function ElementOne($$anchor, $$props) {
    push$1($$props, true);
    let name = prop($$props, "name", 7, "world");
    var fragment = root$v();
    var node = first_child(fragment);
    WithTailwind(node, {});
    var div = sibling(node, 2);
    var text2 = child(div);
    reset(div);
    var node_1 = sibling(div, 2);
    IncDec(node_1, { inc: () => myPage.count++, dec: () => myPage.count-- });
    template_effect(() => set_text(text2, `Hello ${name() ?? ""} ${myPage.count ?? ""}`));
    append($$anchor, fragment);
    return pop$1({
      get name() {
        return name();
      },
      set name($$value = "world") {
        name($$value);
        flushSync();
      }
    });
  }
  customElements.define("my-element-one", create_custom_element(ElementOne, { name: {} }, [], [], false));
  var root$u = /* @__PURE__ */ from_html(`<!> <div class="w-fit p-4 bg-green-200 text-white rounded-xl shadow-md" style="width:fit-content">🌱 <strong> </strong> <!> <span class="text-2xl font-bold"> </span></div>`, 1);
  function ElementTwo($$anchor, $$props) {
    push$1($$props, true);
    let message = prop($$props, "message", 7, "OK");
    var fragment = root$u();
    var node = first_child(fragment);
    WithTailwind(node, {});
    var div = sibling(node, 2);
    var strong = sibling(child(div));
    var text2 = child(strong, true);
    reset(strong);
    var node_1 = sibling(strong, 2);
    IncDec(node_1, { inc: () => myPage.count2++, dec: () => myPage.count2-- });
    var span = sibling(node_1, 2);
    var text_1 = child(span, true);
    reset(span);
    reset(div);
    template_effect(() => {
      set_text(text2, message());
      set_text(text_1, myPage.count2);
    });
    append($$anchor, fragment);
    return pop$1({
      get message() {
        return message();
      },
      set message($$value = "OK") {
        message($$value);
        flushSync();
      }
    });
  }
  customElements.define("my-element-two", create_custom_element(ElementTwo, { message: {} }, [], [], false));
  enable_legacy_mode_flag();
  function onclick$1(_, count) {
    set(count, get$1(count) + 1);
  }
  var root$t = /* @__PURE__ */ from_html(`<!> <button class="text-2xl px-4 py-2 bg-yellow-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"> </button>`, 1);
  function MyButton($$anchor) {
    let count = /* @__PURE__ */ mutable_source(0);
    var fragment = root$t();
    var node = first_child(fragment);
    WithTailwind(node, {});
    var button = sibling(node, 2);
    button.__click = [onclick$1, count];
    var text2 = child(button);
    reset(button);
    template_effect(() => set_text(text2, `Click me - ${get$1(count) ?? ""}`));
    append($$anchor, fragment);
  }
  delegate(["click"]);
  customElements.define("my-button", create_custom_element(MyButton, {}, [], [], false));
  var root$s = /* @__PURE__ */ from_html(`<iframe title="ai-frame"></iframe>`);
  function AiFrame($$anchor, $$props) {
    push$1($$props, false);
    let src = fwd("http://localhost:5000/ai-frame");
    init();
    var iframe = root$s();
    template_effect(() => set_attribute(iframe, "src", src));
    append($$anchor, iframe);
    pop$1();
  }
  customElements.define("ai-frame", create_custom_element(AiFrame, {}, [], [], false));
  var root$r = /* @__PURE__ */ from_html(`<div class="outer svelte-1qizcrp"><div class="inner svelte-1qizcrp"><!></div></div>`);
  const $$css$r = {
    hash: "svelte-1qizcrp",
    code: ".outer.svelte-1qizcrp {width:var(--size);height:var(--size);padding-left:calc(var(--size) * var(--padding-left));padding-top:calc(var(--size) * var(--padding-top));border:1px solid #333;}.inner.svelte-1qizcrp {width:calc(var(--size) * (1 - var(--padding-left)));height:calc(var(--size) * (1 - var(--padding-top)));font-size:calc(calc(var(--size) * (1 - var(--padding-top))) / var(--scale));}"
  };
  function Container($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$r);
    let Character = prop($$props, "Character", 7), size = prop($$props, "size", 7), paddingLeft = prop($$props, "paddingLeft", 7), paddingTop = prop($$props, "paddingTop", 7), scale = prop($$props, "scale", 7), bgColor = prop($$props, "bgColor", 7);
    var div = root$r();
    var div_1 = child(div);
    var node = child(div_1);
    component(node, Character, ($$anchor2, Character_1) => {
      Character_1($$anchor2, {});
    });
    reset(div_1);
    reset(div);
    template_effect(() => set_style(div, `--size: ${size() ?? ""}; --padding-left: ${paddingLeft() ?? ""}; --padding-top: ${paddingTop() ?? ""}; --scale: ${scale() ?? ""}; --bgColor: ${bgColor() ?? ""}`));
    append($$anchor, div);
    return pop$1({
      get Character() {
        return Character();
      },
      set Character($$value) {
        Character($$value);
        flushSync();
      },
      get size() {
        return size();
      },
      set size($$value) {
        size($$value);
        flushSync();
      },
      get paddingLeft() {
        return paddingLeft();
      },
      set paddingLeft($$value) {
        paddingLeft($$value);
        flushSync();
      },
      get paddingTop() {
        return paddingTop();
      },
      set paddingTop($$value) {
        paddingTop($$value);
        flushSync();
      },
      get scale() {
        return scale();
      },
      set scale($$value) {
        scale($$value);
        flushSync();
      },
      get bgColor() {
        return bgColor();
      },
      set bgColor($$value) {
        bgColor($$value);
        flushSync();
      }
    });
  }
  create_custom_element(
    Container,
    {
      Character: {},
      size: {},
      paddingLeft: {},
      paddingTop: {},
      scale: {},
      bgColor: {}
    },
    [],
    [],
    true
  );
  var root$q = /* @__PURE__ */ from_html(`<article role="img" aria-label="Cartoon of a hippopotamus sleeping on the hypotenuse of a right triangle" class="svelte-jf96nf"><h1 class="svelte-jf96nf">Hippopotenuse</h1> <div class="hippo svelte-jf96nf"><div class="tail svelte-jf96nf"></div> <div class="body svelte-jf96nf"></div> <div class="leg svelte-jf96nf"></div> <div class="leg svelte-jf96nf"></div> <div class="ear svelte-jf96nf"></div> <div class="ear svelte-jf96nf"></div> <div class="head svelte-jf96nf"></div> <div class="snout svelte-jf96nf"></div> <div class="mouth svelte-jf96nf"></div></div> <div class="triangle svelte-jf96nf"><div class="adjacent svelte-jf96nf"></div> <div class="opposite svelte-jf96nf"></div> <div class="hypotenuse svelte-jf96nf"></div></div> <div class="letter a svelte-jf96nf">A</div> <div class="letter b svelte-jf96nf">B</div> <div class="letter c svelte-jf96nf">C</div> <div class="letter t svelte-jf96nf">&theta;</div> <div class="arc svelte-jf96nf"></div> <div class="square svelte-jf96nf"></div></article>`);
  const $$css$q = {
    hash: "svelte-jf96nf",
    code: `article.svelte-jf96nf {position:relative;width:50em;aspect-ratio:1;:where(.svelte-jf96nf), :where(.svelte-jf96nf)::before, :where(.svelte-jf96nf)::after {position:absolute;box-sizing:border-box;}h1:where(.svelte-jf96nf) {font-size:10em;font-family:'Amatic SC', sans-serif;line-height:1;margin:0;translate:30% -50%;&::before {content:"";width:2em;height:2.2em;border-radius:50%;border:0.05em solid;clip-path:polygon(0 0, 50% 0, 10% 100%, 0 100%);top:0.5em;translatE:-53% 0;rotate:-6deg;}&::after {content:"";width:0.5em;aspect-ratio:1;border:0.05em solid;top:200%;left:-28.25%;border-top:0;border-left:0;}}.triangle:where(.svelte-jf96nf) {--w: 50em;--h: 37.5em;--b: 0.75em;--b2: calc(var(--b) / 2);width:var(--w);height:var(--h);bottom:0;left:0;filter:drop-shadow(-1em -1em 5em #fff4);&::before {content:"";inset:0;background:#fff;clip-path:polygon(0 100%, 100% 100%, 100% 0);}> div:where(.svelte-jf96nf) {height:var(--b);background:#000;bottom:0;border-radius:1em;&.opposite {width:var(--h);right:calc(var(--b2) / -2);transform-origin:calc(100% - var(--b2)) var(--b2);rotate:90deg;}&.adjacent {width:var(--w);}&.hypotenuse {width:hypot(var(--w), var(--h));transform-origin:var(--b2) var(--b2);rotate:atan(-37.5 / 50)}}}.letter:where(.svelte-jf96nf) {font-size:7em;font-family:'Amatic SC';font-weight:700;&.a {top:100%;left:0;translate:-150% -50%;}&.b {top:20%;left:100%;translate:50% -30%;}&.c {top:100%;left:100%;translate:50% -50%;}&.t {top:87%;left:32%;translate:50% -50%;font-weight:400;font-size:6em;}}.square:where(.svelte-jf96nf) {width:15%;aspect-ratio:1;border:0.5em solid;border-right:0;border-bottom:0;bottom:0;right:0;}.arc:where(.svelte-jf96nf) {width:40%;height:20%;left:0;bottom:0;background:radial-gradient(100% 200% at 0 100%, #0000 80%, #000 0 82%, #0000 0)}.hippo:where(.svelte-jf96nf) {--b: 0.75em solid;--c: #cbd;--cl: #edf;--cd: #a9b;--s: pink;width:100%;height:45%;left:0;bottom:0;transform-origin:0.375em calc(100% - 0.375em);rotate:atan(-37.5 / 50);translate:9% -15%;.tail:where(.svelte-jf96nf) {width:6em;aspect-ratio:1;border-radius:0 0 0 100%;border:var(--b) #0000;border-bottom:var(--b);border-left:var(--b);top:35%;left:8%;scale:1 1.2;&::after {content:"";width:80%;aspect-ratio:1;border:var(--b);border-radius:0 50% 50% 50%;rotate:40deg;translate:-50% -50%;background:var(--cd);}}.body:where(.svelte-jf96nf) {left:42%;bottom:0;translate:-50%;width:59%;height:85%;border:var(--b);border-radius:50% / 100% 100% 0 0;background:var(--c);box-shadow:inset 1em 1em var(--cd);}.leg:where(.svelte-jf96nf) {width:18%;height:40%;border:var(--b);border-right:0;border-radius:50% 0 0 50% / 100%;bottom:0;box-shadow:inset 0 3.5em 0 -2em var(--cd);background:radial-gradient(circle at 8% 90%, var(--cl) 10%, #0000 0),\r
        radial-gradient(circle at 5% 66%, var(--cl) 10%, #0000 0),\r
        var(--c);& + & {left:30%;height:35%;width:15%;}}.head:where(.svelte-jf96nf) {width:33%;height:64%;border:var(--b);bottom:0;left:57%;border-radius:50% / 70% 80% 0 0;clip-path:polygon(10% 0, 100% 0, 100% 100%, 20% 100%);background:var(--c);box-shadow:inset -0.5em 0.5em var(--cd);&::before, &::after {content:"";width:20%;aspect-ratio:2;border-radius:50% / 100% 100% 0 0;border:var(--b);border-bottom:0;left:32%;top:35%;rotate:-10deg;}&::after {left:68%;top:28%;rotate:5deg;}}.snout:where(.svelte-jf96nf) {width:30%;height:38%;border:var(--b);bottom:0;right:0;border-radius:50% 50% 2em 50% / 100% 60% 2em 0;clip-path:polygon(10% -100%, 100% -100%, 100% 100%, 20% 100%);background:var(--c);box-shadow:-1em 0 var(--cd), inset -0.75em 0 var(--cd);&::before, &::after {content:"";width:22%;aspect-ratio:1.1;border:var(--b);border-radius:50%;top:-27%;left:40%;background:radial-gradient(circle at 50% 60%, var(--cd) 30%, #0000 0),\r
          var(--c);border-bottom:var(--b) var(--c);}&::after {left:70%;top:-18%;rotate:20deg;}}.mouth:where(.svelte-jf96nf) {width:3em;aspect-ratio:1;border-radius:0 0 0 100%;border:var(--b) #0000;border-bottom:var(--b);border-left:var(--b);border-top:0;bottom:0;left:68%;&::after {content:"";width:150%;aspect-ratio:1;border:var(--b) #0000;border-top:var(--b);border-left:var(--b);border-radius:50%;rotate:45deg;translate:-60% -20%;}}.ear:where(.svelte-jf96nf) {width:5em;aspect-ratio:0.8;border:var(--b);border-bottom:var(--b) var(--c);border-radius:100% / 80% 80% 120% 120%;background:var(--s);box-shadow:inset 0 0 0 1em var(--c);top:35%;left:53%;rotate:-60deg;& + & {top:23%;left:70%;rotate:20deg;}}}}`
  };
  function Hippopotenuse($$anchor) {
    append_styles$1($$anchor, $$css$q);
    var article = root$q();
    append($$anchor, article);
  }
  create_custom_element(Hippopotenuse, {}, [], [], true);
  var root$p = /* @__PURE__ */ from_html(`<article role="img" aria-labelledby="alt" class="svelte-3eq7xg"><h1 id="alt" class="svelte-3eq7xg">Cartoon of bunny in kawaii style</h1> <div class="body svelte-3eq7xg"><div class="arm svelte-3eq7xg"></div> <div class="arm svelte-3eq7xg"></div> <div class="leg svelte-3eq7xg"></div> <div class="leg svelte-3eq7xg"></div></div> <div class="ear svelte-3eq7xg"></div> <div class="ear svelte-3eq7xg"></div> <div class="hair-back svelte-3eq7xg"></div> <div class="head svelte-3eq7xg"><div class="hair svelte-3eq7xg"></div> <div class="cheek svelte-3eq7xg"></div> <div class="cheek svelte-3eq7xg"></div> <div class="eye svelte-3eq7xg"></div> <div class="eye svelte-3eq7xg"></div> <div class="mouth svelte-3eq7xg"></div> <div class="nose svelte-3eq7xg"></div></div></article>`);
  const $$css$p = {
    hash: "svelte-3eq7xg",
    code: 'article.svelte-3eq7xg {--c1: #f0fafa;--c2: #d0e0f6;width:80em;margin-top:15em;aspect-ratio:1;position:relative;:where(.svelte-3eq7xg), :where(.svelte-3eq7xg)::before, :where(.svelte-3eq7xg)::after {position:absolute;box-sizing:border-box;}#alt:where(.svelte-3eq7xg) {width:1px;height:1px;overflow:hidden;}.head:where(.svelte-3eq7xg) {width:52em;height:45em;border:1.5em solid;border-radius:100% / 130% 130% 75% 75%;left:50%;translate:-50%;top:10%;clip-path:polygon(0 -100%, 100% -100%, 100% 100%, 65% 100%, 78.5% 90%, 21.5% 90%, 35% 100%, 0 100%);background:var(--c1);box-shadow:inset 0 -2em 0 1em var(--c2);.hair:where(.svelte-3eq7xg) {width:15%;aspect-ratio:1.1;left:45%;translatE:-50% -80%;&::before {content:"";inset:0;border:1.5em solid;border-radius:50%;background:var(--c1);border-right-color:var(--c1);rotate:50deg;box-shadow:inset 1em 1em var(--c2),\r\n          2em 0em var(--c1);}}.eye:where(.svelte-3eq7xg) {--p: 28%;width:23%;aspect-ratio:1;border-radius:50%;left:var(--p);top:45%;translate:-50%;background:radial-gradient(circle at 38% 30%, #fff 24%, #0000 calc(24% + 1px)),\r\n        radial-gradient(circle at 19% 62%, #fff 12%, #0000 calc(12% + 1px)),\r\n        #000;& + & {left:calc(100% - var(--p))}}.cheek:where(.svelte-3eq7xg) {--p: 18%;--d: 60deg;width:16%;top:66.6%;left:var(--p);translate:-50%;aspect-ratio:1.35;border-radius:50%;box-shadow:inset 0 0 1em 1.25em pink;background:repeating-linear-gradient(var(--d), #0000 0 13%, #f003 0 18%),\r\n        pink;opacity:0.8;rotate:5deg;& ~ & {--d: -60deg;left:calc(100% - var(--p));rotate:-5deg;}}.mouth:where(.svelte-3eq7xg) {top:65%;left:50%;translate:-50%;width:12%;height:22%;border:1.5em solid;border-radius:50% / 0 0 100% 100%;background:radial-gradient(circle at 50% 100%, #d55 30%, #822 0)}.nose:where(.svelte-3eq7xg) {width:10%;aspect-ratio:1.8;background:radial-gradient(circle at 25% 40%, #fff 12%, #0000 0),\r\n        pink;top:58%;left:50%;translate:-50%;border-radius:50%;&::before, &::after {--p: 35%;top:100%;content:"";left:0;right:0;height:100%;border:1.25em solid;border-top:0;border-radius:50% / 0 0 100% 100%;translate:var(--p);background:var(--c1);}&::after {translate:calc(var(--p) * -1);}}}.hair-back:where(.svelte-3eq7xg) {border:1.5em solid;background:var(--c1);width:9%;aspect-ratio:1;border-radius:50%;left:48%;top:4%;box-shadow:inset -1em 1em var(--c2);}.ear:where(.svelte-3eq7xg) {width:20%;height:44%;border:1.5em solid;border-radius:50%;border-radius:100% / 125% 125% 80% 80%;overflow:hidden;background:radial-gradient(130% 100% at 50% 0, #0000 80%, var(--c2) 0),\r\n      var(--c1);rotate:-30deg;left:17%;top:-20%;& ~ & {rotate:70deg;top:-12%;left:68%;background:radial-gradient(130% 100% at 25% 0, #0000 80%, var(--c2) 0),\r\n      var(--c1);&::before {background:radial-gradient(160% 100% at 25% 0, #0000 75%, #f002 0),\r\n        pink;}}&::before {content:"";width:80%;height:80%;left:50%;top:60%;translate:-50% -50%;border:1.5em solid;background:radial-gradient(150% 100% at 50% 0, #0000 80%, #f002 0),\r\n        pink;border-radius:50%;}}.body:where(.svelte-3eq7xg) {bottom:6%;left:50%;translate:-50%;width:41em;height:36em;border:1.5em solid;border-bottom:2em solid;border-radius:100% / 130% 130% 75% 75%;background:radial-gradient(135% 110% at 50% 0%,var(--c2) 40%, #0000 calc(40% + 1px)),\r\n      var(--c1);box-shadow:inset 0 -2em 0 1em var(--c2);.arm:where(.svelte-3eq7xg) {\r\n      animation: flip 3s alternate infinite;--p: -4%;--d: 19deg;width:28%;height:36%;top:24%;left:var(--p);translate:-50%;border:1.5em solid;background:var(--c1);border-radius:100% 0 0 100% / 50%;border-right:0;box-shadow:inset 0 -1em var(--c2);transform-origin:100% 0;rotate:var(--d);box-shadow:4em 0 0 -1em var(--c1), inset 0 -1em var(--c2);& ~ & {left:auto;right:var(--p);scale:-1 1;rotate:-15deg;}}.leg:where(.svelte-3eq7xg) {--p: 18%;--d: 22deg;width:35%;aspect-ratio:1.5;border-radius:0 0 15em 15em;border:1.5em solid;top:91%;left:var(--p);background:var(--c2);border-top:0;border-bottom:1.6em solid;rotate:var(--d);translate:-50%;box-shadow:inset 0 -3.5em 0 -2em #0061;& ~ & {left:calc(100% - var(--p));--d: -22deg;}}}}'
  };
  function Bunny($$anchor) {
    append_styles$1($$anchor, $$css$p);
    var article = root$p();
    append($$anchor, article);
  }
  create_custom_element(Bunny, {}, [], [], true);
  function CartoonBadge($$anchor, $$props) {
    push$1($$props, true);
    let character = prop($$props, "character", 7, "hippo"), size = prop($$props, "size", 7, "200px");
    let characters = /* @__PURE__ */ new Map([
      [
        "hippo",
        {
          Character: Hippopotenuse,
          paddingLeft: 0.1,
          paddingTop: 0.1,
          scale: 50,
          bgColor: "#ffcc00",
          size: "200px"
        }
      ],
      [
        "bunny",
        {
          Character: Bunny,
          paddingLeft: 0.08,
          paddingTop: 0.18,
          scale: 80,
          bgColor: "#ffcc00",
          size: "200px"
        }
      ]
    ]);
    let info = characters.get(character()) || characters.get("hippo");
    info.size = size();
    Container($$anchor, spread_props(() => info));
    return pop$1({
      get character() {
        return character();
      },
      set character($$value = "hippo") {
        character($$value);
        flushSync();
      },
      get size() {
        return size();
      },
      set size($$value = "200px") {
        size($$value);
        flushSync();
      }
    });
  }
  customElements.define("cartoon-badge", create_custom_element(CartoonBadge, { character: {}, size: {} }, [], [], true));
  var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
  var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
  var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
  var unicode = {
    Space_Separator,
    ID_Start,
    ID_Continue
  };
  var util = {
    isSpaceSeparator(c2) {
      return typeof c2 === "string" && unicode.Space_Separator.test(c2);
    },
    isIdStartChar(c2) {
      return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
    },
    isIdContinueChar(c2) {
      return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "‌" || c2 === "‍" || unicode.ID_Continue.test(c2));
    },
    isDigit(c2) {
      return typeof c2 === "string" && /[0-9]/.test(c2);
    },
    isHexDigit(c2) {
      return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
    }
  };
  let source;
  let parseState;
  let stack;
  let pos;
  let line;
  let column;
  let token;
  let key;
  let root$o;
  var parse = function parse2(text2, reviver) {
    source = String(text2);
    parseState = "start";
    stack = [];
    pos = 0;
    line = 1;
    column = 0;
    token = void 0;
    key = void 0;
    root$o = void 0;
    do {
      token = lex();
      parseStates[parseState]();
    } while (token.type !== "eof");
    if (typeof reviver === "function") {
      return internalize({ "": root$o }, "", reviver);
    }
    return root$o;
  };
  function internalize(holder, name, reviver) {
    const value = holder[name];
    if (value != null && typeof value === "object") {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const key2 = String(i);
          const replacement = internalize(value, key2, reviver);
          if (replacement === void 0) {
            delete value[key2];
          } else {
            Object.defineProperty(value, key2, {
              value: replacement,
              writable: true,
              enumerable: true,
              configurable: true
            });
          }
        }
      } else {
        for (const key2 in value) {
          const replacement = internalize(value, key2, reviver);
          if (replacement === void 0) {
            delete value[key2];
          } else {
            Object.defineProperty(value, key2, {
              value: replacement,
              writable: true,
              enumerable: true,
              configurable: true
            });
          }
        }
      }
    }
    return reviver.call(holder, name, value);
  }
  let lexState;
  let buffer;
  let doubleQuote;
  let sign;
  let c;
  function lex() {
    lexState = "default";
    buffer = "";
    doubleQuote = false;
    sign = 1;
    for (; ; ) {
      c = peek();
      const token2 = lexStates[lexState]();
      if (token2) {
        return token2;
      }
    }
  }
  function peek() {
    if (source[pos]) {
      return String.fromCodePoint(source.codePointAt(pos));
    }
  }
  function read() {
    const c2 = peek();
    if (c2 === "\n") {
      line++;
      column = 0;
    } else if (c2) {
      column += c2.length;
    } else {
      column++;
    }
    if (c2) {
      pos += c2.length;
    }
    return c2;
  }
  const lexStates = {
    default() {
      switch (c) {
        case "	":
        case "\v":
        case "\f":
        case " ":
        case " ":
        case "\uFEFF":
        case "\n":
        case "\r":
        case "\u2028":
        case "\u2029":
          read();
          return;
        case "/":
          read();
          lexState = "comment";
          return;
        case void 0:
          read();
          return newToken("eof");
      }
      if (util.isSpaceSeparator(c)) {
        read();
        return;
      }
      return lexStates[parseState]();
    },
    comment() {
      switch (c) {
        case "*":
          read();
          lexState = "multiLineComment";
          return;
        case "/":
          read();
          lexState = "singleLineComment";
          return;
      }
      throw invalidChar(read());
    },
    multiLineComment() {
      switch (c) {
        case "*":
          read();
          lexState = "multiLineCommentAsterisk";
          return;
        case void 0:
          throw invalidChar(read());
      }
      read();
    },
    multiLineCommentAsterisk() {
      switch (c) {
        case "*":
          read();
          return;
        case "/":
          read();
          lexState = "default";
          return;
        case void 0:
          throw invalidChar(read());
      }
      read();
      lexState = "multiLineComment";
    },
    singleLineComment() {
      switch (c) {
        case "\n":
        case "\r":
        case "\u2028":
        case "\u2029":
          read();
          lexState = "default";
          return;
        case void 0:
          read();
          return newToken("eof");
      }
      read();
    },
    value() {
      switch (c) {
        case "{":
        case "[":
          return newToken("punctuator", read());
        case "n":
          read();
          literal("ull");
          return newToken("null", null);
        case "t":
          read();
          literal("rue");
          return newToken("boolean", true);
        case "f":
          read();
          literal("alse");
          return newToken("boolean", false);
        case "-":
        case "+":
          if (read() === "-") {
            sign = -1;
          }
          lexState = "sign";
          return;
        case ".":
          buffer = read();
          lexState = "decimalPointLeading";
          return;
        case "0":
          buffer = read();
          lexState = "zero";
          return;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          buffer = read();
          lexState = "decimalInteger";
          return;
        case "I":
          read();
          literal("nfinity");
          return newToken("numeric", Infinity);
        case "N":
          read();
          literal("aN");
          return newToken("numeric", NaN);
        case '"':
        case "'":
          doubleQuote = read() === '"';
          buffer = "";
          lexState = "string";
          return;
      }
      throw invalidChar(read());
    },
    identifierNameStartEscape() {
      if (c !== "u") {
        throw invalidChar(read());
      }
      read();
      const u = unicodeEscape();
      switch (u) {
        case "$":
        case "_":
          break;
        default:
          if (!util.isIdStartChar(u)) {
            throw invalidIdentifier();
          }
          break;
      }
      buffer += u;
      lexState = "identifierName";
    },
    identifierName() {
      switch (c) {
        case "$":
        case "_":
        case "‌":
        case "‍":
          buffer += read();
          return;
        case "\\":
          read();
          lexState = "identifierNameEscape";
          return;
      }
      if (util.isIdContinueChar(c)) {
        buffer += read();
        return;
      }
      return newToken("identifier", buffer);
    },
    identifierNameEscape() {
      if (c !== "u") {
        throw invalidChar(read());
      }
      read();
      const u = unicodeEscape();
      switch (u) {
        case "$":
        case "_":
        case "‌":
        case "‍":
          break;
        default:
          if (!util.isIdContinueChar(u)) {
            throw invalidIdentifier();
          }
          break;
      }
      buffer += u;
      lexState = "identifierName";
    },
    sign() {
      switch (c) {
        case ".":
          buffer = read();
          lexState = "decimalPointLeading";
          return;
        case "0":
          buffer = read();
          lexState = "zero";
          return;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          buffer = read();
          lexState = "decimalInteger";
          return;
        case "I":
          read();
          literal("nfinity");
          return newToken("numeric", sign * Infinity);
        case "N":
          read();
          literal("aN");
          return newToken("numeric", NaN);
      }
      throw invalidChar(read());
    },
    zero() {
      switch (c) {
        case ".":
          buffer += read();
          lexState = "decimalPoint";
          return;
        case "e":
        case "E":
          buffer += read();
          lexState = "decimalExponent";
          return;
        case "x":
        case "X":
          buffer += read();
          lexState = "hexadecimal";
          return;
      }
      return newToken("numeric", sign * 0);
    },
    decimalInteger() {
      switch (c) {
        case ".":
          buffer += read();
          lexState = "decimalPoint";
          return;
        case "e":
        case "E":
          buffer += read();
          lexState = "decimalExponent";
          return;
      }
      if (util.isDigit(c)) {
        buffer += read();
        return;
      }
      return newToken("numeric", sign * Number(buffer));
    },
    decimalPointLeading() {
      if (util.isDigit(c)) {
        buffer += read();
        lexState = "decimalFraction";
        return;
      }
      throw invalidChar(read());
    },
    decimalPoint() {
      switch (c) {
        case "e":
        case "E":
          buffer += read();
          lexState = "decimalExponent";
          return;
      }
      if (util.isDigit(c)) {
        buffer += read();
        lexState = "decimalFraction";
        return;
      }
      return newToken("numeric", sign * Number(buffer));
    },
    decimalFraction() {
      switch (c) {
        case "e":
        case "E":
          buffer += read();
          lexState = "decimalExponent";
          return;
      }
      if (util.isDigit(c)) {
        buffer += read();
        return;
      }
      return newToken("numeric", sign * Number(buffer));
    },
    decimalExponent() {
      switch (c) {
        case "+":
        case "-":
          buffer += read();
          lexState = "decimalExponentSign";
          return;
      }
      if (util.isDigit(c)) {
        buffer += read();
        lexState = "decimalExponentInteger";
        return;
      }
      throw invalidChar(read());
    },
    decimalExponentSign() {
      if (util.isDigit(c)) {
        buffer += read();
        lexState = "decimalExponentInteger";
        return;
      }
      throw invalidChar(read());
    },
    decimalExponentInteger() {
      if (util.isDigit(c)) {
        buffer += read();
        return;
      }
      return newToken("numeric", sign * Number(buffer));
    },
    hexadecimal() {
      if (util.isHexDigit(c)) {
        buffer += read();
        lexState = "hexadecimalInteger";
        return;
      }
      throw invalidChar(read());
    },
    hexadecimalInteger() {
      if (util.isHexDigit(c)) {
        buffer += read();
        return;
      }
      return newToken("numeric", sign * Number(buffer));
    },
    string() {
      switch (c) {
        case "\\":
          read();
          buffer += escape();
          return;
        case '"':
          if (doubleQuote) {
            read();
            return newToken("string", buffer);
          }
          buffer += read();
          return;
        case "'":
          if (!doubleQuote) {
            read();
            return newToken("string", buffer);
          }
          buffer += read();
          return;
        case "\n":
        case "\r":
          throw invalidChar(read());
        case "\u2028":
        case "\u2029":
          separatorChar(c);
          break;
        case void 0:
          throw invalidChar(read());
      }
      buffer += read();
    },
    start() {
      switch (c) {
        case "{":
        case "[":
          return newToken("punctuator", read());
      }
      lexState = "value";
    },
    beforePropertyName() {
      switch (c) {
        case "$":
        case "_":
          buffer = read();
          lexState = "identifierName";
          return;
        case "\\":
          read();
          lexState = "identifierNameStartEscape";
          return;
        case "}":
          return newToken("punctuator", read());
        case '"':
        case "'":
          doubleQuote = read() === '"';
          lexState = "string";
          return;
      }
      if (util.isIdStartChar(c)) {
        buffer += read();
        lexState = "identifierName";
        return;
      }
      throw invalidChar(read());
    },
    afterPropertyName() {
      if (c === ":") {
        return newToken("punctuator", read());
      }
      throw invalidChar(read());
    },
    beforePropertyValue() {
      lexState = "value";
    },
    afterPropertyValue() {
      switch (c) {
        case ",":
        case "}":
          return newToken("punctuator", read());
      }
      throw invalidChar(read());
    },
    beforeArrayValue() {
      if (c === "]") {
        return newToken("punctuator", read());
      }
      lexState = "value";
    },
    afterArrayValue() {
      switch (c) {
        case ",":
        case "]":
          return newToken("punctuator", read());
      }
      throw invalidChar(read());
    },
    end() {
      throw invalidChar(read());
    }
  };
  function newToken(type, value) {
    return {
      type,
      value,
      line,
      column
    };
  }
  function literal(s) {
    for (const c2 of s) {
      const p = peek();
      if (p !== c2) {
        throw invalidChar(read());
      }
      read();
    }
  }
  function escape() {
    const c2 = peek();
    switch (c2) {
      case "b":
        read();
        return "\b";
      case "f":
        read();
        return "\f";
      case "n":
        read();
        return "\n";
      case "r":
        read();
        return "\r";
      case "t":
        read();
        return "	";
      case "v":
        read();
        return "\v";
      case "0":
        read();
        if (util.isDigit(peek())) {
          throw invalidChar(read());
        }
        return "\0";
      case "x":
        read();
        return hexEscape();
      case "u":
        read();
        return unicodeEscape();
      case "\n":
      case "\u2028":
      case "\u2029":
        read();
        return "";
      case "\r":
        read();
        if (peek() === "\n") {
          read();
        }
        return "";
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        throw invalidChar(read());
      case void 0:
        throw invalidChar(read());
    }
    return read();
  }
  function hexEscape() {
    let buffer2 = "";
    let c2 = peek();
    if (!util.isHexDigit(c2)) {
      throw invalidChar(read());
    }
    buffer2 += read();
    c2 = peek();
    if (!util.isHexDigit(c2)) {
      throw invalidChar(read());
    }
    buffer2 += read();
    return String.fromCodePoint(parseInt(buffer2, 16));
  }
  function unicodeEscape() {
    let buffer2 = "";
    let count = 4;
    while (count-- > 0) {
      const c2 = peek();
      if (!util.isHexDigit(c2)) {
        throw invalidChar(read());
      }
      buffer2 += read();
    }
    return String.fromCodePoint(parseInt(buffer2, 16));
  }
  const parseStates = {
    start() {
      if (token.type === "eof") {
        throw invalidEOF();
      }
      push();
    },
    beforePropertyName() {
      switch (token.type) {
        case "identifier":
        case "string":
          key = token.value;
          parseState = "afterPropertyName";
          return;
        case "punctuator":
          pop();
          return;
        case "eof":
          throw invalidEOF();
      }
    },
    afterPropertyName() {
      if (token.type === "eof") {
        throw invalidEOF();
      }
      parseState = "beforePropertyValue";
    },
    beforePropertyValue() {
      if (token.type === "eof") {
        throw invalidEOF();
      }
      push();
    },
    beforeArrayValue() {
      if (token.type === "eof") {
        throw invalidEOF();
      }
      if (token.type === "punctuator" && token.value === "]") {
        pop();
        return;
      }
      push();
    },
    afterPropertyValue() {
      if (token.type === "eof") {
        throw invalidEOF();
      }
      switch (token.value) {
        case ",":
          parseState = "beforePropertyName";
          return;
        case "}":
          pop();
      }
    },
    afterArrayValue() {
      if (token.type === "eof") {
        throw invalidEOF();
      }
      switch (token.value) {
        case ",":
          parseState = "beforeArrayValue";
          return;
        case "]":
          pop();
      }
    },
    end() {
    }
  };
  function push() {
    let value;
    switch (token.type) {
      case "punctuator":
        switch (token.value) {
          case "{":
            value = {};
            break;
          case "[":
            value = [];
            break;
        }
        break;
      case "null":
      case "boolean":
      case "numeric":
      case "string":
        value = token.value;
        break;
    }
    if (root$o === void 0) {
      root$o = value;
    } else {
      const parent = stack[stack.length - 1];
      if (Array.isArray(parent)) {
        parent.push(value);
      } else {
        Object.defineProperty(parent, key, {
          value,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    }
    if (value !== null && typeof value === "object") {
      stack.push(value);
      if (Array.isArray(value)) {
        parseState = "beforeArrayValue";
      } else {
        parseState = "beforePropertyName";
      }
    } else {
      const current2 = stack[stack.length - 1];
      if (current2 == null) {
        parseState = "end";
      } else if (Array.isArray(current2)) {
        parseState = "afterArrayValue";
      } else {
        parseState = "afterPropertyValue";
      }
    }
  }
  function pop() {
    stack.pop();
    const current2 = stack[stack.length - 1];
    if (current2 == null) {
      parseState = "end";
    } else if (Array.isArray(current2)) {
      parseState = "afterArrayValue";
    } else {
      parseState = "afterPropertyValue";
    }
  }
  function invalidChar(c2) {
    if (c2 === void 0) {
      return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
    }
    return syntaxError(`JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
  }
  function invalidEOF() {
    return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
  }
  function invalidIdentifier() {
    column -= 5;
    return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
  }
  function separatorChar(c2) {
    console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
  }
  function formatChar(c2) {
    const replacements = {
      "'": "\\'",
      '"': '\\"',
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\v": "\\v",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    if (replacements[c2]) {
      return replacements[c2];
    }
    if (c2 < " ") {
      const hexString = c2.charCodeAt(0).toString(16);
      return "\\x" + ("00" + hexString).substring(hexString.length);
    }
    return c2;
  }
  function syntaxError(message) {
    const err = new SyntaxError(message);
    err.lineNumber = line;
    err.columnNumber = column;
    return err;
  }
  var stringify = function stringify2(value, replacer, space) {
    const stack2 = [];
    let indent = "";
    let propertyList;
    let replacerFunc;
    let gap = "";
    let quote;
    if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
      space = replacer.space;
      quote = replacer.quote;
      replacer = replacer.replacer;
    }
    if (typeof replacer === "function") {
      replacerFunc = replacer;
    } else if (Array.isArray(replacer)) {
      propertyList = [];
      for (const v of replacer) {
        let item;
        if (typeof v === "string") {
          item = v;
        } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
          item = String(v);
        }
        if (item !== void 0 && propertyList.indexOf(item) < 0) {
          propertyList.push(item);
        }
      }
    }
    if (space instanceof Number) {
      space = Number(space);
    } else if (space instanceof String) {
      space = String(space);
    }
    if (typeof space === "number") {
      if (space > 0) {
        space = Math.min(10, Math.floor(space));
        gap = "          ".substr(0, space);
      }
    } else if (typeof space === "string") {
      gap = space.substr(0, 10);
    }
    return serializeProperty("", { "": value });
    function serializeProperty(key2, holder) {
      let value2 = holder[key2];
      if (value2 != null) {
        if (typeof value2.toJSON5 === "function") {
          value2 = value2.toJSON5(key2);
        } else if (typeof value2.toJSON === "function") {
          value2 = value2.toJSON(key2);
        }
      }
      if (replacerFunc) {
        value2 = replacerFunc.call(holder, key2, value2);
      }
      if (value2 instanceof Number) {
        value2 = Number(value2);
      } else if (value2 instanceof String) {
        value2 = String(value2);
      } else if (value2 instanceof Boolean) {
        value2 = value2.valueOf();
      }
      switch (value2) {
        case null:
          return "null";
        case true:
          return "true";
        case false:
          return "false";
      }
      if (typeof value2 === "string") {
        return quoteString(value2);
      }
      if (typeof value2 === "number") {
        return String(value2);
      }
      if (typeof value2 === "object") {
        return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
      }
      return void 0;
    }
    function quoteString(value2) {
      const quotes = {
        "'": 0.1,
        '"': 0.2
      };
      const replacements = {
        "'": "\\'",
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "	": "\\t",
        "\v": "\\v",
        "\0": "\\0",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      };
      let product = "";
      for (let i = 0; i < value2.length; i++) {
        const c2 = value2[i];
        switch (c2) {
          case "'":
          case '"':
            quotes[c2]++;
            product += c2;
            continue;
          case "\0":
            if (util.isDigit(value2[i + 1])) {
              product += "\\x00";
              continue;
            }
        }
        if (replacements[c2]) {
          product += replacements[c2];
          continue;
        }
        if (c2 < " ") {
          let hexString = c2.charCodeAt(0).toString(16);
          product += "\\x" + ("00" + hexString).substring(hexString.length);
          continue;
        }
        product += c2;
      }
      const quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
      product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
      return quoteChar + product + quoteChar;
    }
    function serializeObject(value2) {
      if (stack2.indexOf(value2) >= 0) {
        throw TypeError("Converting circular structure to JSON5");
      }
      stack2.push(value2);
      let stepback = indent;
      indent = indent + gap;
      let keys = propertyList || Object.keys(value2);
      let partial = [];
      for (const key2 of keys) {
        const propertyString = serializeProperty(key2, value2);
        if (propertyString !== void 0) {
          let member = serializeKey(key2) + ":";
          if (gap !== "") {
            member += " ";
          }
          member += propertyString;
          partial.push(member);
        }
      }
      let final;
      if (partial.length === 0) {
        final = "{}";
      } else {
        let properties;
        if (gap === "") {
          properties = partial.join(",");
          final = "{" + properties + "}";
        } else {
          let separator = ",\n" + indent;
          properties = partial.join(separator);
          final = "{\n" + indent + properties + ",\n" + stepback + "}";
        }
      }
      stack2.pop();
      indent = stepback;
      return final;
    }
    function serializeKey(key2) {
      if (key2.length === 0) {
        return quoteString(key2);
      }
      const firstChar = String.fromCodePoint(key2.codePointAt(0));
      if (!util.isIdStartChar(firstChar)) {
        return quoteString(key2);
      }
      for (let i = firstChar.length; i < key2.length; i++) {
        if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i)))) {
          return quoteString(key2);
        }
      }
      return key2;
    }
    function serializeArray(value2) {
      if (stack2.indexOf(value2) >= 0) {
        throw TypeError("Converting circular structure to JSON5");
      }
      stack2.push(value2);
      let stepback = indent;
      indent = indent + gap;
      let partial = [];
      for (let i = 0; i < value2.length; i++) {
        const propertyString = serializeProperty(String(i), value2);
        partial.push(propertyString !== void 0 ? propertyString : "null");
      }
      let final;
      if (partial.length === 0) {
        final = "[]";
      } else {
        if (gap === "") {
          let properties = partial.join(",");
          final = "[" + properties + "]";
        } else {
          let separator = ",\n" + indent;
          let properties = partial.join(separator);
          final = "[\n" + indent + properties + ",\n" + stepback + "]";
        }
      }
      stack2.pop();
      indent = stepback;
      return final;
    }
  };
  const JSON5 = {
    parse,
    stringify
  };
  var lib = JSON5;
  var root_1$b = /* @__PURE__ */ from_html(`<progress class="progress progress-primary svelte-18i2ml5"></progress>`);
  var root$n = /* @__PURE__ */ from_html(`<!> <!>`, 1);
  const $$css$o = {
    hash: "svelte-18i2ml5",
    code: "progress.svelte-18i2ml5 {position:fixed;bottom:1px;width:90%;left:10px;}"
  };
  function DrillCard($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$o);
    let rounds = prop($$props, "rounds", 7), children = prop($$props, "children", 7);
    var fragment = root$n();
    var node = first_child(fragment);
    snippet(node, children);
    var node_1 = sibling(node, 2);
    {
      var consequent = ($$anchor2) => {
        var progress = root_1$b();
        set_value(progress, 1);
        template_effect(() => set_attribute(progress, "max", rounds()));
        append($$anchor2, progress);
      };
      if_block(node_1, ($$render) => {
        if (rounds() > 1) $$render(consequent);
      });
    }
    append($$anchor, fragment);
    return pop$1({
      get rounds() {
        return rounds();
      },
      set rounds($$value) {
        rounds($$value);
        flushSync();
      },
      get children() {
        return children();
      },
      set children($$value) {
        children($$value);
        flushSync();
      }
    });
  }
  create_custom_element(DrillCard, { rounds: {}, children: {} }, [], [], true);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var lodash$1 = { exports: {} };
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  var lodash = lodash$1.exports;
  var hasRequiredLodash;
  function requireLodash() {
    if (hasRequiredLodash) return lodash$1.exports;
    hasRequiredLodash = 1;
    (function(module, exports) {
      (function() {
        var undefined$1;
        var VERSION2 = "4.17.21";
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = "__lodash_placeholder__";
        var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          ["ary", WRAP_ARY_FLAG],
          ["bind", WRAP_BIND_FLAG],
          ["bindKey", WRAP_BIND_KEY_FLAG],
          ["curry", WRAP_CURRY_FLAG],
          ["curryRight", WRAP_CURRY_RIGHT_FLAG],
          ["flip", WRAP_FLIP_FLAG],
          ["partial", WRAP_PARTIAL_FLAG],
          ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
          ["rearg", WRAP_REARG_FLAG]
        ];
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\s+/;
        var reWhitespace = /\s/;
        var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
        var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
        var reEscapeChar = /\\(\\)?/g;
        var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var reFlags = /\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
        var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
        var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
        var reApos = RegExp(rsApos, "g");
        var reComboMark = RegExp(rsCombo, "g");
        var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
        var reUnicodeWord = RegExp([
          rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
          rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
          rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
          rsUpper + "+" + rsOptContrUpper,
          rsOrdUpper,
          rsOrdLower,
          rsDigits,
          rsEmoji
        ].join("|"), "g");
        var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout"
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          // Latin-1 Supplement block.
          "À": "A",
          "Á": "A",
          "Â": "A",
          "Ã": "A",
          "Ä": "A",
          "Å": "A",
          "à": "a",
          "á": "a",
          "â": "a",
          "ã": "a",
          "ä": "a",
          "å": "a",
          "Ç": "C",
          "ç": "c",
          "Ð": "D",
          "ð": "d",
          "È": "E",
          "É": "E",
          "Ê": "E",
          "Ë": "E",
          "è": "e",
          "é": "e",
          "ê": "e",
          "ë": "e",
          "Ì": "I",
          "Í": "I",
          "Î": "I",
          "Ï": "I",
          "ì": "i",
          "í": "i",
          "î": "i",
          "ï": "i",
          "Ñ": "N",
          "ñ": "n",
          "Ò": "O",
          "Ó": "O",
          "Ô": "O",
          "Õ": "O",
          "Ö": "O",
          "Ø": "O",
          "ò": "o",
          "ó": "o",
          "ô": "o",
          "õ": "o",
          "ö": "o",
          "ø": "o",
          "Ù": "U",
          "Ú": "U",
          "Û": "U",
          "Ü": "U",
          "ù": "u",
          "ú": "u",
          "û": "u",
          "ü": "u",
          "Ý": "Y",
          "ý": "y",
          "ÿ": "y",
          "Æ": "Ae",
          "æ": "ae",
          "Þ": "Th",
          "þ": "th",
          "ß": "ss",
          // Latin Extended-A block.
          "Ā": "A",
          "Ă": "A",
          "Ą": "A",
          "ā": "a",
          "ă": "a",
          "ą": "a",
          "Ć": "C",
          "Ĉ": "C",
          "Ċ": "C",
          "Č": "C",
          "ć": "c",
          "ĉ": "c",
          "ċ": "c",
          "č": "c",
          "Ď": "D",
          "Đ": "D",
          "ď": "d",
          "đ": "d",
          "Ē": "E",
          "Ĕ": "E",
          "Ė": "E",
          "Ę": "E",
          "Ě": "E",
          "ē": "e",
          "ĕ": "e",
          "ė": "e",
          "ę": "e",
          "ě": "e",
          "Ĝ": "G",
          "Ğ": "G",
          "Ġ": "G",
          "Ģ": "G",
          "ĝ": "g",
          "ğ": "g",
          "ġ": "g",
          "ģ": "g",
          "Ĥ": "H",
          "Ħ": "H",
          "ĥ": "h",
          "ħ": "h",
          "Ĩ": "I",
          "Ī": "I",
          "Ĭ": "I",
          "Į": "I",
          "İ": "I",
          "ĩ": "i",
          "ī": "i",
          "ĭ": "i",
          "į": "i",
          "ı": "i",
          "Ĵ": "J",
          "ĵ": "j",
          "Ķ": "K",
          "ķ": "k",
          "ĸ": "k",
          "Ĺ": "L",
          "Ļ": "L",
          "Ľ": "L",
          "Ŀ": "L",
          "Ł": "L",
          "ĺ": "l",
          "ļ": "l",
          "ľ": "l",
          "ŀ": "l",
          "ł": "l",
          "Ń": "N",
          "Ņ": "N",
          "Ň": "N",
          "Ŋ": "N",
          "ń": "n",
          "ņ": "n",
          "ň": "n",
          "ŋ": "n",
          "Ō": "O",
          "Ŏ": "O",
          "Ő": "O",
          "ō": "o",
          "ŏ": "o",
          "ő": "o",
          "Ŕ": "R",
          "Ŗ": "R",
          "Ř": "R",
          "ŕ": "r",
          "ŗ": "r",
          "ř": "r",
          "Ś": "S",
          "Ŝ": "S",
          "Ş": "S",
          "Š": "S",
          "ś": "s",
          "ŝ": "s",
          "ş": "s",
          "š": "s",
          "Ţ": "T",
          "Ť": "T",
          "Ŧ": "T",
          "ţ": "t",
          "ť": "t",
          "ŧ": "t",
          "Ũ": "U",
          "Ū": "U",
          "Ŭ": "U",
          "Ů": "U",
          "Ű": "U",
          "Ų": "U",
          "ũ": "u",
          "ū": "u",
          "ŭ": "u",
          "ů": "u",
          "ű": "u",
          "ų": "u",
          "Ŵ": "W",
          "ŵ": "w",
          "Ŷ": "Y",
          "ŷ": "y",
          "Ÿ": "Y",
          "Ź": "Z",
          "Ż": "Z",
          "Ž": "Z",
          "ź": "z",
          "ż": "z",
          "ž": "z",
          "Ĳ": "IJ",
          "ĳ": "ij",
          "Œ": "Oe",
          "œ": "oe",
          "ŉ": "'n",
          "ſ": "s"
        };
        var htmlEscapes = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var htmlUnescapes = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'"
        };
        var stringEscapes = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029"
        };
        var freeParseFloat = parseFloat, freeParseInt = parseInt;
        var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root2 = freeGlobal || freeSelf || Function("return this")();
        var freeExports = exports && !exports.nodeType && exports;
        var freeModule = freeExports && true && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = (function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e) {
          }
        })();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index2 = -1, length = array == null ? 0 : array.length;
          while (++index2 < length) {
            var value = array[index2];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        function arrayEach(array, iteratee) {
          var index2 = -1, length = array == null ? 0 : array.length;
          while (++index2 < length) {
            if (iteratee(array[index2], index2, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEachRight(array, iteratee) {
          var length = array == null ? 0 : array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEvery(array, predicate) {
          var index2 = -1, length = array == null ? 0 : array.length;
          while (++index2 < length) {
            if (!predicate(array[index2], index2, array)) {
              return false;
            }
          }
          return true;
        }
        function arrayFilter(array, predicate) {
          var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
          while (++index2 < length) {
            var value = array[index2];
            if (predicate(value, index2, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        function arrayIncludes(array, value) {
          var length = array == null ? 0 : array.length;
          return !!length && baseIndexOf(array, value, 0) > -1;
        }
        function arrayIncludesWith(array, value, comparator) {
          var index2 = -1, length = array == null ? 0 : array.length;
          while (++index2 < length) {
            if (comparator(value, array[index2])) {
              return true;
            }
          }
          return false;
        }
        function arrayMap(array, iteratee) {
          var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
          while (++index2 < length) {
            result[index2] = iteratee(array[index2], index2, array);
          }
          return result;
        }
        function arrayPush(array, values) {
          var index2 = -1, length = values.length, offset = array.length;
          while (++index2 < length) {
            array[offset + index2] = values[index2];
          }
          return array;
        }
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index2 = -1, length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[++index2];
          }
          while (++index2 < length) {
            accumulator = iteratee(accumulator, array[index2], index2, array);
          }
          return accumulator;
        }
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index2 = -1, length = array == null ? 0 : array.length;
          while (++index2 < length) {
            if (predicate(array[index2], index2, array)) {
              return true;
            }
          }
          return false;
        }
        var asciiSize = baseProperty("length");
        function asciiToArray(string) {
          return string.split("");
        }
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function(value, key2, collection2) {
            if (predicate(value, key2, collection2)) {
              result = key2;
              return false;
            }
          });
          return result;
        }
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index2-- : ++index2 < length) {
            if (predicate(array[index2], index2, array)) {
              return index2;
            }
          }
          return -1;
        }
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index2 = fromIndex - 1, length = array.length;
          while (++index2 < length) {
            if (comparator(array[index2], value)) {
              return index2;
            }
          }
          return -1;
        }
        function baseIsNaN(value) {
          return value !== value;
        }
        function baseMean(array, iteratee) {
          var length = array == null ? 0 : array.length;
          return length ? baseSum(array, iteratee) / length : NAN;
        }
        function baseProperty(key2) {
          return function(object) {
            return object == null ? undefined$1 : object[key2];
          };
        }
        function basePropertyOf(object) {
          return function(key2) {
            return object == null ? undefined$1 : object[key2];
          };
        }
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function(value, index2, collection2) {
            accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index2, collection2);
          });
          return accumulator;
        }
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        function baseSum(array, iteratee) {
          var result, index2 = -1, length = array.length;
          while (++index2 < length) {
            var current2 = iteratee(array[index2]);
            if (current2 !== undefined$1) {
              result = result === undefined$1 ? current2 : result + current2;
            }
          }
          return result;
        }
        function baseTimes(n, iteratee) {
          var index2 = -1, result = Array(n);
          while (++index2 < n) {
            result[index2] = iteratee(index2);
          }
          return result;
        }
        function baseToPairs(object, props) {
          return arrayMap(props, function(key2) {
            return [key2, object[key2]];
          });
        }
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
        }
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        function baseValues(object, props) {
          return arrayMap(props, function(key2) {
            return object[key2];
          });
        }
        function cacheHas(cache, key2) {
          return cache.has(key2);
        }
        function charsStartIndex(strSymbols, chrSymbols) {
          var index2 = -1, length = strSymbols.length;
          while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
          }
          return index2;
        }
        function charsEndIndex(strSymbols, chrSymbols) {
          var index2 = strSymbols.length;
          while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
          }
          return index2;
        }
        function countHolders(array, placeholder) {
          var length = array.length, result = 0;
          while (length--) {
            if (array[length] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return "\\" + stringEscapes[chr];
        }
        function getValue(object, key2) {
          return object == null ? undefined$1 : object[key2];
        }
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        function iteratorToArray(iterator) {
          var data, result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        function mapToArray(map) {
          var index2 = -1, result = Array(map.size);
          map.forEach(function(value, key2) {
            result[++index2] = [key2, value];
          });
          return result;
        }
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        function replaceHolders(array, placeholder) {
          var index2 = -1, length = array.length, resIndex = 0, result = [];
          while (++index2 < length) {
            var value = array[index2];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index2] = PLACEHOLDER;
              result[resIndex++] = index2;
            }
          }
          return result;
        }
        function setToArray(set2) {
          var index2 = -1, result = Array(set2.size);
          set2.forEach(function(value) {
            result[++index2] = value;
          });
          return result;
        }
        function setToPairs(set2) {
          var index2 = -1, result = Array(set2.size);
          set2.forEach(function(value) {
            result[++index2] = [value, value];
          });
          return result;
        }
        function strictIndexOf(array, value, fromIndex) {
          var index2 = fromIndex - 1, length = array.length;
          while (++index2 < length) {
            if (array[index2] === value) {
              return index2;
            }
          }
          return -1;
        }
        function strictLastIndexOf(array, value, fromIndex) {
          var index2 = fromIndex + 1;
          while (index2--) {
            if (array[index2] === value) {
              return index2;
            }
          }
          return index2;
        }
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        function trimmedEndIndex(string) {
          var index2 = string.length;
          while (index2-- && reWhitespace.test(string.charAt(index2))) {
          }
          return index2;
        }
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = reUnicode.lastIndex = 0;
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        var runInContext = (function runInContext2(context) {
          context = context == null ? root2 : _.defaults(root2.Object(), context, _.pick(root2, contextProps));
          var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
          var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
          var coreJsData = context["__core-js_shared__"];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = (function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
          })();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(Object2);
          var oldDash = root2._;
          var reIsNative = RegExp2(
            "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
          );
          var Buffer = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined$1;
          var defineProperty = (function() {
            try {
              var func = getNative(Object2, "defineProperty");
              func({}, "", {});
              return func;
            } catch (e) {
            }
          })();
          var ctxClearTimeout = context.clearTimeout !== root2.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root2.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root2.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
          var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
          var metaMap = WeakMap2 && new WeakMap2();
          var realNames = {};
          var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
          var symbolProto = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
          function lodash2(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, "__wrapped__")) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          var baseCreate = /* @__PURE__ */ (function() {
            function object() {
            }
            return function(proto) {
              if (!isObject(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var result2 = new object();
              object.prototype = undefined$1;
              return result2;
            };
          })();
          function baseLodash() {
          }
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined$1;
          }
          lodash2.templateSettings = {
            /**
             * Used to detect `data` property values to be HTML-escaped.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "escape": reEscape,
            /**
             * Used to detect code to be evaluated.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "evaluate": reEvaluate,
            /**
             * Used to detect `data` property values to inject.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "interpolate": reInterpolate,
            /**
             * Used to reference the data object in the template text.
             *
             * @memberOf _.templateSettings
             * @type {string}
             */
            "variable": "",
            /**
             * Used to import variables into the compiled template.
             *
             * @memberOf _.templateSettings
             * @type {Object}
             */
            "imports": {
              /**
               * A reference to the `lodash` function.
               *
               * @memberOf _.templateSettings.imports
               * @type {Function}
               */
              "_": lodash2
            }
          };
          lodash2.prototype = baseLodash.prototype;
          lodash2.prototype.constructor = lodash2;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          function lazyClone() {
            var result2 = new LazyWrapper(this.__wrapped__);
            result2.__actions__ = copyArray(this.__actions__);
            result2.__dir__ = this.__dir__;
            result2.__filtered__ = this.__filtered__;
            result2.__iteratees__ = copyArray(this.__iteratees__);
            result2.__takeCount__ = this.__takeCount__;
            result2.__views__ = copyArray(this.__views__);
            return result2;
          }
          function lazyReverse() {
            if (this.__filtered__) {
              var result2 = new LazyWrapper(this);
              result2.__dir__ = -1;
              result2.__filtered__ = true;
            } else {
              result2 = this.clone();
              result2.__dir__ *= -1;
            }
            return result2;
          }
          function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index2 = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || !isRight && arrLength == length && takeCount == length) {
              return baseWrapperValue(array, this.__actions__);
            }
            var result2 = [];
            outer:
              while (length-- && resIndex < takeCount) {
                index2 += dir;
                var iterIndex = -1, value = array[index2];
                while (++iterIndex < iterLength) {
                  var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                  if (type == LAZY_MAP_FLAG) {
                    value = computed;
                  } else if (!computed) {
                    if (type == LAZY_FILTER_FLAG) {
                      continue outer;
                    } else {
                      break outer;
                    }
                  }
                }
                result2[resIndex++] = value;
              }
            return result2;
          }
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index2 = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index2 < length) {
              var entry = entries[index2];
              this.set(entry[0], entry[1]);
            }
          }
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          function hashDelete(key2) {
            var result2 = this.has(key2) && delete this.__data__[key2];
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function hashGet(key2) {
            var data = this.__data__;
            if (nativeCreate) {
              var result2 = data[key2];
              return result2 === HASH_UNDEFINED ? undefined$1 : result2;
            }
            return hasOwnProperty.call(data, key2) ? data[key2] : undefined$1;
          }
          function hashHas(key2) {
            var data = this.__data__;
            return nativeCreate ? data[key2] !== undefined$1 : hasOwnProperty.call(data, key2);
          }
          function hashSet(key2, value) {
            var data = this.__data__;
            this.size += this.has(key2) ? 0 : 1;
            data[key2] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
            return this;
          }
          Hash.prototype.clear = hashClear;
          Hash.prototype["delete"] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index2 = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index2 < length) {
              var entry = entries[index2];
              this.set(entry[0], entry[1]);
            }
          }
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          function listCacheDelete(key2) {
            var data = this.__data__, index2 = assocIndexOf(data, key2);
            if (index2 < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index2 == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index2, 1);
            }
            --this.size;
            return true;
          }
          function listCacheGet(key2) {
            var data = this.__data__, index2 = assocIndexOf(data, key2);
            return index2 < 0 ? undefined$1 : data[index2][1];
          }
          function listCacheHas(key2) {
            return assocIndexOf(this.__data__, key2) > -1;
          }
          function listCacheSet(key2, value) {
            var data = this.__data__, index2 = assocIndexOf(data, key2);
            if (index2 < 0) {
              ++this.size;
              data.push([key2, value]);
            } else {
              data[index2][1] = value;
            }
            return this;
          }
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype["delete"] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index2 = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index2 < length) {
              var entry = entries[index2];
              this.set(entry[0], entry[1]);
            }
          }
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              "hash": new Hash(),
              "map": new (Map2 || ListCache)(),
              "string": new Hash()
            };
          }
          function mapCacheDelete(key2) {
            var result2 = getMapData(this, key2)["delete"](key2);
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function mapCacheGet(key2) {
            return getMapData(this, key2).get(key2);
          }
          function mapCacheHas(key2) {
            return getMapData(this, key2).has(key2);
          }
          function mapCacheSet(key2, value) {
            var data = getMapData(this, key2), size2 = data.size;
            data.set(key2, value);
            this.size += data.size == size2 ? 0 : 1;
            return this;
          }
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype["delete"] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values2) {
            var index2 = -1, length = values2 == null ? 0 : values2.length;
            this.__data__ = new MapCache();
            while (++index2 < length) {
              this.add(values2[index2]);
            }
          }
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
          }
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          function stackDelete(key2) {
            var data = this.__data__, result2 = data["delete"](key2);
            this.size = data.size;
            return result2;
          }
          function stackGet(key2) {
            return this.__data__.get(key2);
          }
          function stackHas(key2) {
            return this.__data__.has(key2);
          }
          function stackSet(key2, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key2, value]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key2, value);
            this.size = data.size;
            return this;
          }
          Stack.prototype.clear = stackClear;
          Stack.prototype["delete"] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
            for (var key2 in value) {
              if ((inherited || hasOwnProperty.call(value, key2)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
              (key2 == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
              isBuff && (key2 == "offset" || key2 == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
              isType && (key2 == "buffer" || key2 == "byteLength" || key2 == "byteOffset") || // Skip index properties.
              isIndex(key2, length)))) {
                result2.push(key2);
              }
            }
            return result2;
          }
          function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined$1;
          }
          function arraySampleSize(array, n) {
            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
          }
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          function assignMergeValue(object, key2, value) {
            if (value !== undefined$1 && !eq(object[key2], value) || value === undefined$1 && !(key2 in object)) {
              baseAssignValue(object, key2, value);
            }
          }
          function assignValue(object, key2, value) {
            var objValue = object[key2];
            if (!(hasOwnProperty.call(object, key2) && eq(objValue, value)) || value === undefined$1 && !(key2 in object)) {
              baseAssignValue(object, key2, value);
            }
          }
          function assocIndexOf(array, key2) {
            var length = array.length;
            while (length--) {
              if (eq(array[length][0], key2)) {
                return length;
              }
            }
            return -1;
          }
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function(value, key2, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          function baseAssign(object, source2) {
            return object && copyObject(source2, keys(source2), object);
          }
          function baseAssignIn(object, source2) {
            return object && copyObject(source2, keysIn(source2), object);
          }
          function baseAssignValue(object, key2, value) {
            if (key2 == "__proto__" && defineProperty) {
              defineProperty(object, key2, {
                "configurable": true,
                "enumerable": true,
                "value": value,
                "writable": true
              });
            } else {
              object[key2] = value;
            }
          }
          function baseAt(object, paths) {
            var index2 = -1, length = paths.length, result2 = Array2(length), skip = object == null;
            while (++index2 < length) {
              result2[index2] = skip ? undefined$1 : get2(object, paths[index2]);
            }
            return result2;
          }
          function baseClamp(number2, lower, upper) {
            if (number2 === number2) {
              if (upper !== undefined$1) {
                number2 = number2 <= upper ? number2 : upper;
              }
              if (lower !== undefined$1) {
                number2 = number2 >= lower ? number2 : lower;
              }
            }
            return number2;
          }
          function baseClone(value, bitmask, customizer, key2, object, stack2) {
            var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              result2 = object ? customizer(value, key2, object, stack2) : customizer(value);
            }
            if (result2 !== undefined$1) {
              return result2;
            }
            if (!isObject(value)) {
              return value;
            }
            var isArr = isArray(value);
            if (isArr) {
              result2 = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, result2);
              }
            } else {
              var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || isFunc && !object) {
                result2 = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                result2 = initCloneByTag(value, tag, isDeep);
              }
            }
            stack2 || (stack2 = new Stack());
            var stacked = stack2.get(value);
            if (stacked) {
              return stacked;
            }
            stack2.set(value, result2);
            if (isSet(value)) {
              value.forEach(function(subValue) {
                result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack2));
              });
            } else if (isMap(value)) {
              value.forEach(function(subValue, key3) {
                result2.set(key3, baseClone(subValue, bitmask, customizer, key3, value, stack2));
              });
            }
            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
            var props = isArr ? undefined$1 : keysFunc(value);
            arrayEach(props || value, function(subValue, key3) {
              if (props) {
                key3 = subValue;
                subValue = value[key3];
              }
              assignValue(result2, key3, baseClone(subValue, bitmask, customizer, key3, value, stack2));
            });
            return result2;
          }
          function baseConforms(source2) {
            var props = keys(source2);
            return function(object) {
              return baseConformsTo(object, source2, props);
            };
          }
          function baseConformsTo(object, source2, props) {
            var length = props.length;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (length--) {
              var key2 = props[length], predicate = source2[key2], value = object[key2];
              if (value === undefined$1 && !(key2 in object) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          function baseDelay(func, wait, args) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return setTimeout2(function() {
              func.apply(undefined$1, args);
            }, wait);
          }
          function baseDifference(array, values2, iteratee2, comparator) {
            var index2 = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
            if (!length) {
              return result2;
            }
            if (iteratee2) {
              values2 = arrayMap(values2, baseUnary(iteratee2));
            }
            if (comparator) {
              includes2 = arrayIncludesWith;
              isCommon = false;
            } else if (values2.length >= LARGE_ARRAY_SIZE) {
              includes2 = cacheHas;
              isCommon = false;
              values2 = new SetCache(values2);
            }
            outer:
              while (++index2 < length) {
                var value = array[index2], computed = iteratee2 == null ? value : iteratee2(value);
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values2[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  result2.push(value);
                } else if (!includes2(values2, computed, comparator)) {
                  result2.push(value);
                }
              }
            return result2;
          }
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var result2 = true;
            baseEach(collection, function(value, index2, collection2) {
              result2 = !!predicate(value, index2, collection2);
              return result2;
            });
            return result2;
          }
          function baseExtremum(array, iteratee2, comparator) {
            var index2 = -1, length = array.length;
            while (++index2 < length) {
              var value = array[index2], current2 = iteratee2(value);
              if (current2 != null && (computed === undefined$1 ? current2 === current2 && !isSymbol(current2) : comparator(current2, computed))) {
                var computed = current2, result2 = value;
              }
            }
            return result2;
          }
          function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end === undefined$1 || end > length ? length : toInteger(end);
            if (end < 0) {
              end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          function baseFilter(collection, predicate) {
            var result2 = [];
            baseEach(collection, function(value, index2, collection2) {
              if (predicate(value, index2, collection2)) {
                result2.push(value);
              }
            });
            return result2;
          }
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index2 = -1, length = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index2 < length) {
              var value = array[index2];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys);
          }
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys);
          }
          function baseFunctions(object, props) {
            return arrayFilter(props, function(key2) {
              return isFunction(object[key2]);
            });
          }
          function baseGet(object, path) {
            path = castPath(path, object);
            var index2 = 0, length = path.length;
            while (object != null && index2 < length) {
              object = object[toKey(path[index2++])];
            }
            return index2 && index2 == length ? object : undefined$1;
          }
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result2 = keysFunc(object);
            return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
          }
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined$1 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString2(value);
          }
          function baseGt(value, other) {
            return value > other;
          }
          function baseHas(object, key2) {
            return object != null && hasOwnProperty.call(object, key2);
          }
          function baseHasIn(object, key2) {
            return object != null && key2 in Object2(object);
          }
          function baseInRange(number2, start, end) {
            return number2 >= nativeMin(start, end) && number2 < nativeMax(start, end);
          }
          function baseIntersection(arrays, iteratee2, comparator) {
            var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
            }
            array = arrays[0];
            var index2 = -1, seen = caches[0];
            outer:
              while (++index2 < length && result2.length < maxLength) {
                var value = array[index2], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache = caches[othIndex];
                    if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function(value, key2, object2) {
              setter(accumulator, iteratee2(value), key2, object2);
            });
            return accumulator;
          }
          function baseInvoke(object, path, args) {
            path = castPath(path, object);
            object = parent(object, path);
            var func = object == null ? object : object[toKey(last(path))];
            return func == null ? undefined$1 : apply(func, object, args);
          }
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          function baseIsEqual(value, other, bitmask, customizer, stack2) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack2);
          }
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack2) {
            var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack2 || (stack2 = new Stack());
              return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack2) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack2);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack2 || (stack2 = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack2);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack2 || (stack2 = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack2);
          }
          function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
          }
          function baseIsMatch(object, source2, matchData, customizer) {
            var index2 = matchData.length, length = index2, noCustomizer = !customizer;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (index2--) {
              var data = matchData[index2];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index2 < length) {
              data = matchData[index2];
              var key2 = data[0], objValue = object[key2], srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined$1 && !(key2 in object)) {
                  return false;
                }
              } else {
                var stack2 = new Stack();
                if (customizer) {
                  var result2 = customizer(objValue, srcValue, key2, object, source2, stack2);
                }
                if (!(result2 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack2) : result2)) {
                  return false;
                }
              }
            }
            return true;
          }
          function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
          }
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          function baseIteratee(value) {
            if (typeof value == "function") {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == "object") {
              return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var result2 = [];
            for (var key2 in Object2(object)) {
              if (hasOwnProperty.call(object, key2) && key2 != "constructor") {
                result2.push(key2);
              }
            }
            return result2;
          }
          function baseKeysIn(object) {
            if (!isObject(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), result2 = [];
            for (var key2 in object) {
              if (!(key2 == "constructor" && (isProto || !hasOwnProperty.call(object, key2)))) {
                result2.push(key2);
              }
            }
            return result2;
          }
          function baseLt(value, other) {
            return value < other;
          }
          function baseMap(collection, iteratee2) {
            var index2 = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value, key2, collection2) {
              result2[++index2] = iteratee2(value, key2, collection2);
            });
            return result2;
          }
          function baseMatches(source2) {
            var matchData = getMatchData(source2);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function(object) {
              return object === source2 || baseIsMatch(object, source2, matchData);
            };
          }
          function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path), srcValue);
            }
            return function(object) {
              var objValue = get2(object, path);
              return objValue === undefined$1 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          function baseMerge(object, source2, srcIndex, customizer, stack2) {
            if (object === source2) {
              return;
            }
            baseFor(source2, function(srcValue, key2) {
              stack2 || (stack2 = new Stack());
              if (isObject(srcValue)) {
                baseMergeDeep(object, source2, key2, srcIndex, baseMerge, customizer, stack2);
              } else {
                var newValue = customizer ? customizer(safeGet(object, key2), srcValue, key2 + "", object, source2, stack2) : undefined$1;
                if (newValue === undefined$1) {
                  newValue = srcValue;
                }
                assignMergeValue(object, key2, newValue);
              }
            }, keysIn);
          }
          function baseMergeDeep(object, source2, key2, srcIndex, mergeFunc, customizer, stack2) {
            var objValue = safeGet(object, key2), srcValue = safeGet(source2, key2), stacked = stack2.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key2, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key2 + "", object, source2, stack2) : undefined$1;
            var isCommon = newValue === undefined$1;
            if (isCommon) {
              var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject(objValue) || isFunction(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack2.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack2);
              stack2["delete"](srcValue);
            }
            assignMergeValue(object, key2, newValue);
          }
          function baseNth(array, n) {
            var length = array.length;
            if (!length) {
              return;
            }
            n += n < 0 ? length : 0;
            return isIndex(n, length) ? array[n] : undefined$1;
          }
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function(iteratee2) {
                if (isArray(iteratee2)) {
                  return function(value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [identity];
            }
            var index2 = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var result2 = baseMap(collection, function(value, key2, collection2) {
              var criteria = arrayMap(iteratees, function(iteratee2) {
                return iteratee2(value);
              });
              return { "criteria": criteria, "index": ++index2, "value": value };
            });
            return baseSortBy(result2, function(object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          function basePick(object, paths) {
            return basePickBy(object, paths, function(value, path) {
              return hasIn(object, path);
            });
          }
          function basePickBy(object, paths, predicate) {
            var index2 = -1, length = paths.length, result2 = {};
            while (++index2 < length) {
              var path = paths[index2], value = baseGet(object, path);
              if (predicate(value, path)) {
                baseSet(result2, castPath(path, object), value);
              }
            }
            return result2;
          }
          function basePropertyDeep(path) {
            return function(object) {
              return baseGet(object, path);
            };
          }
          function basePullAll(array, values2, iteratee2, comparator) {
            var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index2 = -1, length = values2.length, seen = array;
            if (array === values2) {
              values2 = copyArray(values2);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index2 < length) {
              var fromIndex = 0, value = values2[index2], computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0, lastIndex = length - 1;
            while (length--) {
              var index2 = indexes[length];
              if (length == lastIndex || index2 !== previous) {
                var previous = index2;
                if (isIndex(index2)) {
                  splice.call(array, index2, 1);
                } else {
                  baseUnset(array, index2);
                }
              }
            }
            return array;
          }
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          function baseRange(start, end, step, fromRight) {
            var index2 = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
            while (length--) {
              result2[fromRight ? length : ++index2] = start;
              start += step;
            }
            return result2;
          }
          function baseRepeat(string, n) {
            var result2 = "";
            if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
              return result2;
            }
            do {
              if (n % 2) {
                result2 += string;
              }
              n = nativeFloor(n / 2);
              if (n) {
                string += string;
              }
            } while (n);
            return result2;
          }
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
          }
          function baseSample(collection) {
            return arraySample(values(collection));
          }
          function baseSampleSize(collection, n) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n, 0, array.length));
          }
          function baseSet(object, path, value, customizer) {
            if (!isObject(object)) {
              return object;
            }
            path = castPath(path, object);
            var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
            while (nested != null && ++index2 < length) {
              var key2 = toKey(path[index2]), newValue = value;
              if (key2 === "__proto__" || key2 === "constructor" || key2 === "prototype") {
                return object;
              }
              if (index2 != lastIndex) {
                var objValue = nested[key2];
                newValue = customizer ? customizer(objValue, key2, nested) : undefined$1;
                if (newValue === undefined$1) {
                  newValue = isObject(objValue) ? objValue : isIndex(path[index2 + 1]) ? [] : {};
                }
              }
              assignValue(nested, key2, newValue);
              nested = nested[key2];
            }
            return object;
          }
          var baseSetData = !metaMap ? identity : function(func, data) {
            metaMap.set(func, data);
            return func;
          };
          var baseSetToString = !defineProperty ? identity : function(func, string) {
            return defineProperty(func, "toString", {
              "configurable": true,
              "enumerable": false,
              "value": constant(string),
              "writable": true
            });
          };
          function baseShuffle(collection) {
            return shuffleSelf(values(collection));
          }
          function baseSlice(array, start, end) {
            var index2 = -1, length = array.length;
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end > length ? length : end;
            if (end < 0) {
              end += length;
            }
            length = start > end ? 0 : end - start >>> 0;
            start >>>= 0;
            var result2 = Array2(length);
            while (++index2 < length) {
              result2[index2] = array[index2 + start];
            }
            return result2;
          }
          function baseSome(collection, predicate) {
            var result2;
            baseEach(collection, function(value, index2, collection2) {
              result2 = predicate(value, index2, collection2);
              return !result2;
            });
            return !!result2;
          }
          function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = low + high >>> 1, computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0, high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          function baseSortedUniq(array, iteratee2) {
            var index2 = -1, length = array.length, resIndex = 0, result2 = [];
            while (++index2 < length) {
              var value = array[index2], computed = iteratee2 ? iteratee2(value) : value;
              if (!index2 || !eq(computed, seen)) {
                var seen = computed;
                result2[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return result2;
          }
          function baseToNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          function baseToString(value) {
            if (typeof value == "string") {
              return value;
            }
            if (isArray(value)) {
              return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : "";
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function baseUniq(array, iteratee2, comparator) {
            var index2 = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
            if (comparator) {
              isCommon = false;
              includes2 = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
              var set3 = iteratee2 ? null : createSet(array);
              if (set3) {
                return setToArray(set3);
              }
              isCommon = false;
              includes2 = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : result2;
            }
            outer:
              while (++index2 < length) {
                var value = array[index2], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var seenIndex = seen.length;
                  while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                      continue outer;
                    }
                  }
                  if (iteratee2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                } else if (!includes2(seen, computed, comparator)) {
                  if (seen !== result2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseUnset(object, path) {
            path = castPath(path, object);
            object = parent(object, path);
            return object == null || delete object[toKey(last(path))];
          }
          function baseUpdate(object, path, updater, customizer) {
            return baseSet(object, path, updater(baseGet(object, path)), customizer);
          }
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length, index2 = fromRight ? length : -1;
            while ((fromRight ? index2-- : ++index2 < length) && predicate(array[index2], index2, array)) {
            }
            return isDrop ? baseSlice(array, fromRight ? 0 : index2, fromRight ? index2 + 1 : length) : baseSlice(array, fromRight ? index2 + 1 : 0, fromRight ? length : index2);
          }
          function baseWrapperValue(value, actions) {
            var result2 = value;
            if (result2 instanceof LazyWrapper) {
              result2 = result2.value();
            }
            return arrayReduce(actions, function(result3, action) {
              return action.func.apply(action.thisArg, arrayPush([result3], action.args));
            }, result2);
          }
          function baseXor(arrays, iteratee2, comparator) {
            var length = arrays.length;
            if (length < 2) {
              return length ? baseUniq(arrays[0]) : [];
            }
            var index2 = -1, result2 = Array2(length);
            while (++index2 < length) {
              var array = arrays[index2], othIndex = -1;
              while (++othIndex < length) {
                if (othIndex != index2) {
                  result2[index2] = baseDifference(result2[index2] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
          }
          function baseZipObject(props, values2, assignFunc) {
            var index2 = -1, length = props.length, valsLength = values2.length, result2 = {};
            while (++index2 < length) {
              var value = index2 < valsLength ? values2[index2] : undefined$1;
              assignFunc(result2, props[index2], value);
            }
            return result2;
          }
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          function castFunction(value) {
            return typeof value == "function" ? value : identity;
          }
          function castPath(value, object) {
            if (isArray(value)) {
              return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString(value));
          }
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined$1 ? length : end;
            return !start && end >= length ? array : baseSlice(array, start, end);
          }
          var clearTimeout2 = ctxClearTimeout || function(id) {
            return root2.clearTimeout(id);
          };
          function cloneBuffer(buffer2, isDeep) {
            if (isDeep) {
              return buffer2.slice();
            }
            var length = buffer2.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer2.constructor(length);
            buffer2.copy(result2);
            return result2;
          }
          function cloneArrayBuffer(arrayBuffer) {
            var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array(result2).set(new Uint8Array(arrayBuffer));
            return result2;
          }
          function cloneDataView(dataView, isDeep) {
            var buffer2 = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer2, dataView.byteOffset, dataView.byteLength);
          }
          function cloneRegExp(regexp) {
            var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result2.lastIndex = regexp.lastIndex;
            return result2;
          }
          function cloneSymbol(symbol) {
            return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
          }
          function cloneTypedArray(typedArray, isDeep) {
            var buffer2 = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer2, typedArray.byteOffset, typedArray.length);
          }
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
              if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                return 1;
              }
              if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                return -1;
              }
            }
            return 0;
          }
          function compareMultiple(object, other, orders) {
            var index2 = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
            while (++index2 < length) {
              var result2 = compareAscending(objCriteria[index2], othCriteria[index2]);
              if (result2) {
                if (index2 >= ordersLength) {
                  return result2;
                }
                var order = orders[index2];
                return result2 * (order == "desc" ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              result2[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              result2[leftIndex++] = args[argsIndex++];
            }
            return result2;
          }
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              result2[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
              result2[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[offset + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return result2;
          }
          function copyArray(source2, array) {
            var index2 = -1, length = source2.length;
            array || (array = Array2(length));
            while (++index2 < length) {
              array[index2] = source2[index2];
            }
            return array;
          }
          function copyObject(source2, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index2 = -1, length = props.length;
            while (++index2 < length) {
              var key2 = props[index2];
              var newValue = customizer ? customizer(object[key2], source2[key2], key2, object, source2) : undefined$1;
              if (newValue === undefined$1) {
                newValue = source2[key2];
              }
              if (isNew) {
                baseAssignValue(object, key2, newValue);
              } else {
                assignValue(object, key2, newValue);
              }
            }
            return object;
          }
          function copySymbols(source2, object) {
            return copyObject(source2, getSymbols(source2), object);
          }
          function copySymbolsIn(source2, object) {
            return copyObject(source2, getSymbolsIn(source2), object);
          }
          function createAggregator(setter, initializer) {
            return function(collection, iteratee2) {
              var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          function createAssigner(assigner) {
            return baseRest(function(object, sources) {
              var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
              customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
              if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                customizer = length < 3 ? undefined$1 : customizer;
                length = 1;
              }
              object = Object2(object);
              while (++index2 < length) {
                var source2 = sources[index2];
                if (source2) {
                  assigner(object, source2, index2, customizer);
                }
              }
              return object;
            });
          }
          function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length = collection.length, index2 = fromRight ? length : -1, iterable = Object2(collection);
              while (fromRight ? index2-- : ++index2 < length) {
                if (iteratee2(iterable[index2], index2, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          function createBaseFor(fromRight) {
            return function(object, iteratee2, keysFunc) {
              var index2 = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
              while (length--) {
                var key2 = props[fromRight ? length : ++index2];
                if (iteratee2(iterable[key2], key2, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            return wrapper;
          }
          function createCaseFirst(methodName) {
            return function(string) {
              string = toString(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          function createCompounder(callback) {
            return function(string) {
              return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
          }
          function createCtor(Ctor) {
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
              return isObject(result2) ? result2 : thisBinding;
            };
          }
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index2 = length, placeholder = getHolder(wrapper);
              while (index2--) {
                args[index2] = arguments[index2];
              }
              var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
              length -= holders.length;
              if (length < arity) {
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  undefined$1,
                  args,
                  holders,
                  undefined$1,
                  undefined$1,
                  arity - length
                );
              }
              var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            return wrapper;
          }
          function createFind(findIndexFunc) {
            return function(collection, predicate, fromIndex) {
              var iterable = Object2(collection);
              if (!isArrayLike(collection)) {
                var iteratee2 = getIteratee(predicate, 3);
                collection = keys(collection);
                predicate = function(key2) {
                  return iteratee2(iterable[key2], key2, iterable);
                };
              }
              var index2 = findIndexFunc(collection, predicate, fromIndex);
              return index2 > -1 ? iterable[iteratee2 ? collection[index2] : index2] : undefined$1;
            };
          }
          function createFlow(fromRight) {
            return flatRest(function(funcs) {
              var length = funcs.length, index2 = length, prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index2--) {
                var func = funcs[index2];
                if (typeof func != "function") {
                  throw new TypeError2(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index2 = wrapper ? index2 : length;
              while (++index2 < length) {
                func = funcs[index2];
                var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
                if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function() {
                var args = arguments, value = args[0];
                if (wrapper && args.length == 1 && isArray(value)) {
                  return wrapper.plant(value).value();
                }
                var index3 = 0, result2 = length ? funcs[index3].apply(this, args) : value;
                while (++index3 < length) {
                  result2 = funcs[index3].call(this, result2);
                }
                return result2;
              };
            });
          }
          function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index2 = length;
              while (index2--) {
                args[index2] = arguments[index2];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length -= holdersCount;
              if (isCurried && length < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  thisArg,
                  args,
                  newHolders,
                  argPos,
                  ary2,
                  arity - length
                );
              }
              var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
              length = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length) {
                args.length = ary2;
              }
              if (this && this !== root2 && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            return wrapper;
          }
          function createInverter(setter, toIteratee) {
            return function(object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          function createMathOperation(operator, defaultValue) {
            return function(value, other) {
              var result2;
              if (value === undefined$1 && other === undefined$1) {
                return defaultValue;
              }
              if (value !== undefined$1) {
                result2 = value;
              }
              if (other !== undefined$1) {
                if (result2 === undefined$1) {
                  return other;
                }
                if (typeof value == "string" || typeof other == "string") {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                result2 = operator(value, other);
              }
              return result2;
            };
          }
          function createOver(arrayFunc) {
            return flatRest(function(iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function(args) {
                var thisArg = this;
                return arrayFunc(iteratees, function(iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          function createPadding(length, chars) {
            chars = chars === undefined$1 ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length) : chars;
            }
            var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
          }
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            return wrapper;
          }
          function createRange(fromRight) {
            return function(start, end, step) {
              if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                end = step = undefined$1;
              }
              start = toFinite(start);
              if (end === undefined$1) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          function createRelationalOperation(operator) {
            return function(value, other) {
              if (!(typeof value == "string" && typeof other == "string")) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= -4;
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity
            ];
            var result2 = wrapFunc.apply(undefined$1, newData);
            if (isLaziable(func)) {
              setData(result2, newData);
            }
            result2.placeholder = placeholder;
            return setWrapToString(result2, func, bitmask);
          }
          function createRound(methodName) {
            var func = Math2[methodName];
            return function(number2, precision) {
              number2 = toNumber(number2);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number2)) {
                var pair = (toString(number2) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (toString(value) + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
              }
              return func(number2);
            };
          }
          var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop2 : function(values2) {
            return new Set2(values2);
          };
          function createToPairs(keysFunc) {
            return function(object) {
              var tag = getTag(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
              bitmask &= -97;
              partials = holders = undefined$1;
            }
            ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined$1 ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials, holdersRight = holders;
              partials = holders = undefined$1;
            }
            var data = isBindKey ? undefined$1 : getData(func);
            var newData = [
              func,
              bitmask,
              thisArg,
              partials,
              holders,
              partialsRight,
              holdersRight,
              argPos,
              ary2,
              arity
            ];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= -25;
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var result2 = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              result2 = createCurry(func, bitmask, arity);
            } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
              result2 = createPartial(func, bitmask, thisArg, partials);
            } else {
              result2 = createHybrid.apply(undefined$1, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result2, newData), func, bitmask);
          }
          function customDefaultsAssignIn(objValue, srcValue, key2, object) {
            if (objValue === undefined$1 || eq(objValue, objectProto[key2]) && !hasOwnProperty.call(object, key2)) {
              return srcValue;
            }
            return objValue;
          }
          function customDefaultsMerge(objValue, srcValue, key2, object, source2, stack2) {
            if (isObject(objValue) && isObject(srcValue)) {
              stack2.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack2);
              stack2["delete"](srcValue);
            }
            return objValue;
          }
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined$1 : value;
          }
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack2) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack2.get(array);
            var othStacked = stack2.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index2 = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
            stack2.set(array, other);
            stack2.set(other, array);
            while (++index2 < arrLength) {
              var arrValue = array[index2], othValue = other[index2];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack2) : customizer(arrValue, othValue, index2, array, other, stack2);
              }
              if (compared !== undefined$1) {
                if (compared) {
                  continue;
                }
                result2 = false;
                break;
              }
              if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                  if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack2))) {
                    return seen.push(othIndex);
                  }
                })) {
                  result2 = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack2))) {
                result2 = false;
                break;
              }
            }
            stack2["delete"](array);
            stack2["delete"](other);
            return result2;
          }
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack2) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + "";
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack2.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack2.set(object, other);
                var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack2);
                stack2["delete"](object);
                return result2;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack2) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index2 = objLength;
            while (index2--) {
              var key2 = objProps[index2];
              if (!(isPartial ? key2 in other : hasOwnProperty.call(other, key2))) {
                return false;
              }
            }
            var objStacked = stack2.get(object);
            var othStacked = stack2.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var result2 = true;
            stack2.set(object, other);
            stack2.set(other, object);
            var skipCtor = isPartial;
            while (++index2 < objLength) {
              key2 = objProps[index2];
              var objValue = object[key2], othValue = other[key2];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key2, other, object, stack2) : customizer(objValue, othValue, key2, object, other, stack2);
              }
              if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack2) : compared)) {
                result2 = false;
                break;
              }
              skipCtor || (skipCtor = key2 == "constructor");
            }
            if (result2 && !skipCtor) {
              var objCtor = object.constructor, othCtor = other.constructor;
              if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result2 = false;
              }
            }
            stack2["delete"](object);
            stack2["delete"](other);
            return result2;
          }
          function flatRest(func) {
            return setToString(overRest(func, undefined$1, flatten2), func + "");
          }
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
          }
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          var getData = !metaMap ? noop2 : function(func) {
            return metaMap.get(func);
          };
          function getFuncName(func) {
            var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
            while (length--) {
              var data = array[length], otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return result2;
          }
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash2, "placeholder") ? lodash2 : func;
            return object.placeholder;
          }
          function getIteratee() {
            var result2 = lodash2.iteratee || iteratee;
            result2 = result2 === iteratee ? baseIteratee : result2;
            return arguments.length ? result2(arguments[0], arguments[1]) : result2;
          }
          function getMapData(map2, key2) {
            var data = map2.__data__;
            return isKeyable(key2) ? data[typeof key2 == "string" ? "string" : "hash"] : data.map;
          }
          function getMatchData(object) {
            var result2 = keys(object), length = result2.length;
            while (length--) {
              var key2 = result2[length], value = object[key2];
              result2[length] = [key2, value, isStrictComparable(value)];
            }
            return result2;
          }
          function getNative(object, key2) {
            var value = getValue(object, key2);
            return baseIsNative(value) ? value : undefined$1;
          }
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined$1;
              var unmasked = true;
            } catch (e) {
            }
            var result2 = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result2;
          }
          var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
            if (object == null) {
              return [];
            }
            object = Object2(object);
            return arrayFilter(nativeGetSymbols(object), function(symbol) {
              return propertyIsEnumerable.call(object, symbol);
            });
          };
          var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
            var result2 = [];
            while (object) {
              arrayPush(result2, getSymbols(object));
              object = getPrototype(object);
            }
            return result2;
          };
          var getTag = baseGetTag;
          if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
            getTag = function(value) {
              var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : "";
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return result2;
            };
          }
          function getView(start, end, transforms) {
            var index2 = -1, length = transforms.length;
            while (++index2 < length) {
              var data = transforms[index2], size2 = data.size;
              switch (data.type) {
                case "drop":
                  start += size2;
                  break;
                case "dropRight":
                  end -= size2;
                  break;
                case "take":
                  end = nativeMin(end, start + size2);
                  break;
                case "takeRight":
                  start = nativeMax(start, end - size2);
                  break;
              }
            }
            return { "start": start, "end": end };
          }
          function getWrapDetails(source2) {
            var match = source2.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
          }
          function hasPath(object, path, hasFunc) {
            path = castPath(path, object);
            var index2 = -1, length = path.length, result2 = false;
            while (++index2 < length) {
              var key2 = toKey(path[index2]);
              if (!(result2 = object != null && hasFunc(object, key2))) {
                break;
              }
              object = object[key2];
            }
            if (result2 || ++index2 != length) {
              return result2;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key2, length) && (isArray(object) || isArguments(object));
          }
          function initCloneArray(array) {
            var length = array.length, result2 = new array.constructor(length);
            if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
              result2.index = array.index;
              result2.input = array.input;
            }
            return result2;
          }
          function initCloneObject(object) {
            return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
          }
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          function insertWrapDetails(source2, details) {
            var length = details.length;
            if (!length) {
              return source2;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length > 2 ? ", " : " ");
            return source2.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
          }
          function isFlattenable(value) {
            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          function isIndex(value, length) {
            var type = typeof value;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
          }
          function isIterateeCall(value, index2, object) {
            if (!isObject(object)) {
              return false;
            }
            var type = typeof index2;
            if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
              return eq(object[index2], value);
            }
            return false;
          }
          function isKey(value, object) {
            if (isArray(value)) {
              return false;
            }
            var type = typeof value;
            if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
              return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
          }
          function isKeyable(value) {
            var type = typeof value;
            return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
          }
          function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash2[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          var isMaskable = coreJsData ? isFunction : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
            return value === proto;
          }
          function isStrictComparable(value) {
            return value === value && !isObject(value);
          }
          function matchesStrictComparable(key2, srcValue) {
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key2] === srcValue && (srcValue !== undefined$1 || key2 in Object2(object));
            };
          }
          function memoizeCapped(func) {
            var result2 = memoize(func, function(key2) {
              if (cache.size === MAX_MEMOIZE_SIZE) {
                cache.clear();
              }
              return key2;
            });
            var cache = result2.cache;
            return result2;
          }
          function mergeData(data, source2) {
            var bitmask = data[1], srcBitmask = source2[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source2[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source2[7].length <= source2[8] && bitmask == WRAP_CURRY_FLAG;
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source2[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source2[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source2[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source2[4];
            }
            value = source2[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source2[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source2[6];
            }
            value = source2[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source2[8] : nativeMin(data[8], source2[8]);
            }
            if (data[9] == null) {
              data[9] = source2[9];
            }
            data[0] = source2[0];
            data[1] = newBitmask;
            return data;
          }
          function nativeKeysIn(object) {
            var result2 = [];
            if (object != null) {
              for (var key2 in Object2(object)) {
                result2.push(key2);
              }
            }
            return result2;
          }
          function objectToString2(value) {
            return nativeObjectToString.call(value);
          }
          function overRest(func, start, transform2) {
            start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
            return function() {
              var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
              while (++index2 < length) {
                array[index2] = args[start + index2];
              }
              index2 = -1;
              var otherArgs = Array2(start + 1);
              while (++index2 < start) {
                otherArgs[index2] = args[index2];
              }
              otherArgs[start] = transform2(array);
              return apply(func, this, otherArgs);
            };
          }
          function parent(object, path) {
            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
          }
          function reorder(array, indexes) {
            var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length--) {
              var index2 = indexes[length];
              array[length] = isIndex(index2, arrLength) ? oldArray[index2] : undefined$1;
            }
            return array;
          }
          function safeGet(object, key2) {
            if (key2 === "constructor" && typeof object[key2] === "function") {
              return;
            }
            if (key2 == "__proto__") {
              return;
            }
            return object[key2];
          }
          var setData = shortOut(baseSetData);
          var setTimeout2 = ctxSetTimeout || function(func, wait) {
            return root2.setTimeout(func, wait);
          };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source2 = reference + "";
            return setToString(wrapper, insertWrapDetails(source2, updateWrapDetails(getWrapDetails(source2), bitmask)));
          }
          function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
              var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined$1, arguments);
            };
          }
          function shuffleSelf(array, size2) {
            var index2 = -1, length = array.length, lastIndex = length - 1;
            size2 = size2 === undefined$1 ? length : size2;
            while (++index2 < size2) {
              var rand = baseRandom(index2, lastIndex), value = array[rand];
              array[rand] = array[index2];
              array[index2] = value;
            }
            array.length = size2;
            return array;
          }
          var stringToPath = memoizeCapped(function(string) {
            var result2 = [];
            if (string.charCodeAt(0) === 46) {
              result2.push("");
            }
            string.replace(rePropName, function(match, number2, quote, subString) {
              result2.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match);
            });
            return result2;
          });
          function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
              return value;
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e) {
              }
              try {
                return func + "";
              } catch (e) {
              }
            }
            return "";
          }
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function(pair) {
              var value = "_." + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result2.__actions__ = copyArray(wrapper.__actions__);
            result2.__index__ = wrapper.__index__;
            result2.__values__ = wrapper.__values__;
            return result2;
          }
          function chunk(array, size2, guard) {
            if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$1) {
              size2 = 1;
            } else {
              size2 = nativeMax(toInteger(size2), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size2 < 1) {
              return [];
            }
            var index2 = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
            while (index2 < length) {
              result2[resIndex++] = baseSlice(array, index2, index2 += size2);
            }
            return result2;
          }
          function compact(array) {
            var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
            while (++index2 < length) {
              var value = array[index2];
              if (value) {
                result2[resIndex++] = value;
              }
            }
            return result2;
          }
          function concat() {
            var length = arguments.length;
            if (!length) {
              return [];
            }
            var args = Array2(length - 1), array = arguments[0], index2 = length;
            while (index2--) {
              args[index2 - 1] = arguments[index2];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
          }
          var difference = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
          });
          var differenceBy = baseRest(function(array, values2) {
            var iteratee2 = last(values2);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined$1;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
          });
          var differenceWith = baseRest(function(array, values2) {
            var comparator = last(values2);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined$1;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
          });
          function drop(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined$1 ? 1 : toInteger(n);
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function dropRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined$1 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
              start = 0;
              end = length;
            }
            return baseFill(array, value, start, end);
          }
          function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index2 < 0) {
              index2 = nativeMax(length + index2, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index2);
          }
          function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index2 = length - 1;
            if (fromIndex !== undefined$1) {
              index2 = toInteger(fromIndex);
              index2 = fromIndex < 0 ? nativeMax(length + index2, 0) : nativeMin(index2, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index2, true);
          }
          function flatten2(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
          }
          function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
          }
          function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            depth = depth === undefined$1 ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          function fromPairs(pairs) {
            var index2 = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
            while (++index2 < length) {
              var pair = pairs[index2];
              result2[pair[0]] = pair[1];
            }
            return result2;
          }
          function head(array) {
            return array && array.length ? array[0] : undefined$1;
          }
          function indexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index2 < 0) {
              index2 = nativeMax(length + index2, 0);
            }
            return baseIndexOf(array, value, index2);
          }
          function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
          }
          var intersection = baseRest(function(arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee2 === last(mapped)) {
              iteratee2 = undefined$1;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
          });
          var intersectionWith = baseRest(function(arrays) {
            var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined$1;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
          }
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined$1;
          }
          function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index2 = length;
            if (fromIndex !== undefined$1) {
              index2 = toInteger(fromIndex);
              index2 = index2 < 0 ? nativeMax(length + index2, 0) : nativeMin(index2, length - 1);
            }
            return value === value ? strictLastIndexOf(array, value, index2) : baseFindIndex(array, baseIsNaN, index2, true);
          }
          function nth(array, n) {
            return array && array.length ? baseNth(array, toInteger(n)) : undefined$1;
          }
          var pull = baseRest(pullAll);
          function pullAll(array, values2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
          }
          function pullAllBy(array, values2, iteratee2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
          }
          function pullAllWith(array, values2, comparator) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$1, comparator) : array;
          }
          var pullAt = flatRest(function(array, indexes) {
            var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function(index2) {
              return isIndex(index2, length) ? +index2 : index2;
            }).sort(compareAscending));
            return result2;
          });
          function remove(array, predicate) {
            var result2 = [];
            if (!(array && array.length)) {
              return result2;
            }
            var index2 = -1, indexes = [], length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index2 < length) {
              var value = array[index2];
              if (predicate(value, index2, array)) {
                result2.push(value);
                indexes.push(index2);
              }
            }
            basePullAt(array, indexes);
            return result2;
          }
          function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
              start = 0;
              end = length;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined$1 ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index2 = baseSortedIndex(array, value);
              if (index2 < length && eq(array[index2], value)) {
                return index2;
              }
            }
            return -1;
          }
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index2 = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index2], value)) {
                return index2;
              }
            }
            return -1;
          }
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
          }
          function take(array, n, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n = guard || n === undefined$1 ? 1 : toInteger(n);
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function takeRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined$1 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          var union = baseRest(function(arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined$1;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
          });
          var unionWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined$1;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
          });
          function uniq(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          function uniqBy(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined$1;
            return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
          }
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length = 0;
            array = arrayFilter(array, function(group) {
              if (isArrayLikeObject(group)) {
                length = nativeMax(group.length, length);
                return true;
              }
            });
            return baseTimes(length, function(index2) {
              return arrayMap(array, baseProperty(index2));
            });
          }
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var result2 = unzip(array);
            if (iteratee2 == null) {
              return result2;
            }
            return arrayMap(result2, function(group) {
              return apply(iteratee2, undefined$1, group);
            });
          }
          var without = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
          });
          var xor = baseRest(function(arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined$1;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
          });
          var xorWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined$1;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values2) {
            return baseZipObject(props || [], values2 || [], assignValue);
          }
          function zipObjectDeep(props, values2) {
            return baseZipObject(props || [], values2 || [], baseSet);
          }
          var zipWith = baseRest(function(arrays) {
            var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
            iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
            return unzipWith(arrays, iteratee2);
          });
          function chain(value) {
            var result2 = lodash2(value);
            result2.__chain__ = true;
            return result2;
          }
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          function thru(value, interceptor) {
            return interceptor(value);
          }
          var wrapperAt = flatRest(function(paths) {
            var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
              return baseAt(object, paths);
            };
            if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
              "func": thru,
              "args": [interceptor],
              "thisArg": undefined$1
            });
            return new LodashWrapper(value, this.__chain__).thru(function(array) {
              if (length && !array.length) {
                array.push(undefined$1);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain(this);
          }
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          function wrapperNext() {
            if (this.__values__ === undefined$1) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
            return { "done": done, "value": value };
          }
          function wrapperToIterator() {
            return this;
          }
          function wrapperPlant(value) {
            var result2, parent2 = this;
            while (parent2 instanceof baseLodash) {
              var clone2 = wrapperClone(parent2);
              clone2.__index__ = 0;
              clone2.__values__ = undefined$1;
              if (result2) {
                previous.__wrapped__ = clone2;
              } else {
                result2 = clone2;
              }
              var previous = clone2;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result2;
          }
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                "func": thru,
                "args": [reverse],
                "thisArg": undefined$1
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
          }
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          var countBy = createAggregator(function(result2, value, key2) {
            if (hasOwnProperty.call(result2, key2)) {
              ++result2[key2];
            } else {
              baseAssignValue(result2, key2, 1);
            }
          });
          function every(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined$1;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          var find = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), 1);
          }
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), INFINITY);
          }
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined$1 ? 1 : toInteger(depth);
            return baseFlatten(map(collection, iteratee2), depth);
          }
          function forEach(collection, iteratee2) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function forEachRight(collection, iteratee2) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          var groupBy = createAggregator(function(result2, value, key2) {
            if (hasOwnProperty.call(result2, key2)) {
              result2[key2].push(value);
            } else {
              baseAssignValue(result2, key2, [value]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
          }
          var invokeMap = baseRest(function(collection, path, args) {
            var index2 = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value) {
              result2[++index2] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
            });
            return result2;
          });
          var keyBy = createAggregator(function(result2, value, key2) {
            baseAssignValue(result2, key2, value);
          });
          function map(collection, iteratee2) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray(iteratees)) {
              iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined$1 : orders;
            if (!isArray(orders)) {
              orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          var partition = createAggregator(function(result2, value, key2) {
            result2[key2 ? 0 : 1].push(value);
          }, function() {
            return [[], []];
          });
          function reduce(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
          }
          function sampleSize(collection, n, guard) {
            if (guard ? isIterateeCall(collection, n, guard) : n === undefined$1) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n);
          }
          function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          function size(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          function some(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined$1;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          var sortBy = baseRest(function(collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now = ctxNow || function() {
            return root2.Date.now();
          };
          function after(n, func) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          function ary(func, n, guard) {
            n = guard ? undefined$1 : n;
            n = func && n == null ? func.length : n;
            return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
          }
          function before(n, func) {
            var result2;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n > 0) {
                result2 = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = undefined$1;
              }
              return result2;
            };
          }
          var bind = baseRest(function(func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function(object, key2, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key2, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined$1 : arity;
            var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
            result2.placeholder = curry.placeholder;
            return result2;
          }
          function curryRight(func, arity, guard) {
            arity = guard ? undefined$1 : arity;
            var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
            result2.placeholder = curryRight.placeholder;
            return result2;
          }
          function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = undefined$1;
              lastInvokeTime = time;
              result2 = func.apply(thisArg, args);
              return result2;
            }
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout2(timerExpired, wait);
              return leading ? invokeFunc(time) : result2;
            }
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout2(timerExpired, remainingWait(time));
            }
            function trailingEdge(time) {
              timerId = undefined$1;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined$1;
              return result2;
            }
            function cancel() {
              if (timerId !== undefined$1) {
                clearTimeout2(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined$1;
            }
            function flush() {
              return timerId === undefined$1 ? result2 : trailingEdge(now());
            }
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined$1) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout2(timerId);
                  timerId = setTimeout2(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined$1) {
                timerId = setTimeout2(timerExpired, wait);
              }
              return result2;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          var defer = baseRest(function(func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function(func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          function memoize(func, resolver) {
            if (typeof func != "function" || resolver != null && typeof resolver != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var memoized = function() {
              var args = arguments, key2 = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
              if (cache.has(key2)) {
                return cache.get(key2);
              }
              var result2 = func.apply(this, args);
              memoized.cache = cache.set(key2, result2) || cache;
              return result2;
            };
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
          }
          memoize.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          function once(func) {
            return before(2, func);
          }
          var overArgs = castRest(function(func, transforms) {
            transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function(args) {
              var index2 = -1, length = nativeMin(args.length, funcsLength);
              while (++index2 < length) {
                args[index2] = transforms[index2].call(this, args[index2]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
          });
          var partialRight = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
          });
          var rearg = flatRest(function(func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
          });
          function rest(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start === undefined$1 ? start : toInteger(start);
            return baseRest(func, start);
          }
          function spread(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function(args) {
              var array = args[start], otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          function throttle(func, wait, options) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (isObject(options)) {
              leading = "leading" in options ? !!options.leading : leading;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
              "leading": leading,
              "maxWait": wait,
              "trailing": trailing
            });
          }
          function unary(func) {
            return ary(func, 1);
          }
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [value];
          }
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          function conformsTo(object, source2) {
            return source2 == null || baseConformsTo(object, source2, keys(source2));
          }
          function eq(value, other) {
            return value === other || value !== value && other !== other;
          }
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function(value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
            return arguments;
          })()) ? baseIsArguments : function(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
          };
          var isArray = Array2.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
          }
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          function isBoolean(value) {
            return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
          }
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          function isEmpty(value) {
            if (value == null) {
              return true;
            }
            if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
              return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key2 in value) {
              if (hasOwnProperty.call(value, key2)) {
                return false;
              }
            }
            return true;
          }
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            var result2 = customizer ? customizer(value, other) : undefined$1;
            return result2 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result2;
          }
          function isError2(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
          }
          function isFinite(value) {
            return typeof value == "number" && nativeIsFinite(value);
          }
          function isFunction(value) {
            if (!isObject(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
          }
          function isLength(value) {
            return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          function isObject(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
          }
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source2) {
            return object === source2 || baseIsMatch(object, source2, getMatchData(source2));
          }
          function isMatchWith(object, source2, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return baseIsMatch(object, source2, getMatchData(source2), customizer);
          }
          function isNaN(value) {
            return isNumber(value) && value != +value;
          }
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          function isNull(value) {
            return value === null;
          }
          function isNil(value) {
            return value == null;
          }
          function isNumber(value) {
            return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
          }
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString(value) {
            return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
          }
          function isSymbol(value) {
            return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined(value) {
            return value === undefined$1;
          }
          function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
          }
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function(value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
            return func(value);
          }
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign2 = value < 0 ? -1 : 1;
              return sign2 * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          function toInteger(value) {
            var result2 = toFinite(value), remainder = result2 % 1;
            return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
          }
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          function toString(value) {
            return value == null ? "" : baseToString(value);
          }
          var assign = createAssigner(function(object, source2) {
            if (isPrototype(source2) || isArrayLike(source2)) {
              copyObject(source2, keys(source2), object);
              return;
            }
            for (var key2 in source2) {
              if (hasOwnProperty.call(source2, key2)) {
                assignValue(object, key2, source2[key2]);
              }
            }
          });
          var assignIn = createAssigner(function(object, source2) {
            copyObject(source2, keysIn(source2), object);
          });
          var assignInWith = createAssigner(function(object, source2, srcIndex, customizer) {
            copyObject(source2, keysIn(source2), object, customizer);
          });
          var assignWith = createAssigner(function(object, source2, srcIndex, customizer) {
            copyObject(source2, keys(source2), object, customizer);
          });
          var at = flatRest(baseAt);
          function create(prototype, properties) {
            var result2 = baseCreate(prototype);
            return properties == null ? result2 : baseAssign(result2, properties);
          }
          var defaults = baseRest(function(object, sources) {
            object = Object2(object);
            var index2 = -1;
            var length = sources.length;
            var guard = length > 2 ? sources[2] : undefined$1;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              length = 1;
            }
            while (++index2 < length) {
              var source2 = sources[index2];
              var props = keysIn(source2);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key2 = props[propsIndex];
                var value = object[key2];
                if (value === undefined$1 || eq(value, objectProto[key2]) && !hasOwnProperty.call(object, key2)) {
                  object[key2] = source2[key2];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function(args) {
            args.push(undefined$1, customDefaultsMerge);
            return apply(mergeWith, undefined$1, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
          }
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          function get2(object, path, defaultValue) {
            var result2 = object == null ? undefined$1 : baseGet(object, path);
            return result2 === undefined$1 ? defaultValue : result2;
          }
          function has(object, path) {
            return object != null && hasPath(object, path, baseHas);
          }
          function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
          }
          var invert = createInverter(function(result2, value, key2) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key2;
          }, constant(identity));
          var invertBy = createInverter(function(result2, value, key2) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key2);
            } else {
              result2[value] = [key2];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          function mapKeys(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key2, object2) {
              baseAssignValue(result2, iteratee2(value, key2, object2), value);
            });
            return result2;
          }
          function mapValues(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key2, object2) {
              baseAssignValue(result2, key2, iteratee2(value, key2, object2));
            });
            return result2;
          }
          var merge = createAssigner(function(object, source2, srcIndex) {
            baseMerge(object, source2, srcIndex);
          });
          var mergeWith = createAssigner(function(object, source2, srcIndex, customizer) {
            baseMerge(object, source2, srcIndex, customizer);
          });
          var omit = flatRest(function(object, paths) {
            var result2 = {};
            if (object == null) {
              return result2;
            }
            var isDeep = false;
            paths = arrayMap(paths, function(path) {
              path = castPath(path, object);
              isDeep || (isDeep = path.length > 1);
              return path;
            });
            copyObject(object, getAllKeysIn(object), result2);
            if (isDeep) {
              result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
              baseUnset(result2, paths[length]);
            }
            return result2;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          var pick = flatRest(function(object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function(prop2) {
              return [prop2];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function(value, path) {
              return predicate(value, path[0]);
            });
          }
          function result(object, path, defaultValue) {
            path = castPath(path, object);
            var index2 = -1, length = path.length;
            if (!length) {
              length = 1;
              object = undefined$1;
            }
            while (++index2 < length) {
              var value = object == null ? undefined$1 : object[toKey(path[index2])];
              if (value === undefined$1) {
                index2 = length;
                value = defaultValue;
              }
              object = isFunction(value) ? value.call(object) : value;
            }
            return object;
          }
          function set2(object, path, value) {
            return object == null ? object : baseSet(object, path, value);
          }
          function setWith(object, path, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return object == null ? object : baseSet(object, path, value, customizer);
          }
          var toPairs = createToPairs(keys);
          var toPairsIn = createToPairs(keysIn);
          function transform(object, iteratee2, accumulator) {
            var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject(object)) {
                accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function(value, index2, object2) {
              return iteratee2(accumulator, value, index2, object2);
            });
            return accumulator;
          }
          function unset(object, path) {
            return object == null ? true : baseUnset(object, path);
          }
          function update2(object, path, updater) {
            return object == null ? object : baseUpdate(object, path, castFunction(updater));
          }
          function updateWith(object, path, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined$1;
            return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
          }
          function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
          }
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          function clamp2(number2, lower, upper) {
            if (upper === undefined$1) {
              upper = lower;
              lower = undefined$1;
            }
            if (upper !== undefined$1) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined$1) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number2), lower, upper);
          }
          function inRange(number2, start, end) {
            start = toFinite(start);
            if (end === undefined$1) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number2 = toNumber(number2);
            return baseInRange(number2, start, end);
          }
          function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined$1;
            }
            if (floating === undefined$1) {
              if (typeof upper == "boolean") {
                floating = upper;
                upper = undefined$1;
              } else if (typeof lower == "boolean") {
                floating = lower;
                lower = undefined$1;
              }
            }
            if (lower === undefined$1 && upper === undefined$1) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined$1) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
            }
            return baseRandom(lower, upper);
          }
          var camelCase = createCompounder(function(result2, word, index2) {
            word = word.toLowerCase();
            return result2 + (index2 ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString(string).toLowerCase());
          }
          function deburr(string) {
            string = toString(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
          }
          function endsWith(string, target, position) {
            string = toString(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          function escape2(string) {
            string = toString(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          function escapeRegExp(string) {
            string = toString(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
          }
          var kebabCase = createCompounder(function(result2, word, index2) {
            return result2 + (index2 ? "-" : "") + word.toLowerCase();
          });
          var lowerCase = createCompounder(function(result2, word, index2) {
            return result2 + (index2 ? " " : "") + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst("toLowerCase");
          function pad(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
              return string;
            }
            var mid = (length - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          function padEnd(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
          }
          function padStart(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
          }
          function parseInt2(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
          }
          function repeat(string, n, guard) {
            if (guard ? isIterateeCall(string, n, guard) : n === undefined$1) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            return baseRepeat(toString(string), n);
          }
          function replace() {
            var args = arguments, string = toString(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          var snakeCase = createCompounder(function(result2, word, index2) {
            return result2 + (index2 ? "_" : "") + word.toLowerCase();
          });
          function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined$1;
            }
            limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString(string);
            if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          var startCase = createCompounder(function(result2, word, index2) {
            return result2 + (index2 ? " " : "") + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          function template(string, options, guard) {
            var settings = lodash2.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
              options = undefined$1;
            }
            string = toString(string);
            options = assignInWith({}, options, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index2 = 0, interpolate = options.interpolate || reNoMatch, source2 = "__p += '";
            var reDelimiters = RegExp2(
              (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
              "g"
            );
            var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
              interpolateValue || (interpolateValue = esTemplateValue);
              source2 += string.slice(index2, offset).replace(reUnescapedString, escapeStringChar);
              if (escapeValue) {
                isEscaping = true;
                source2 += "' +\n__e(" + escapeValue + ") +\n'";
              }
              if (evaluateValue) {
                isEvaluating = true;
                source2 += "';\n" + evaluateValue + ";\n__p += '";
              }
              if (interpolateValue) {
                source2 += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
              }
              index2 = offset + match.length;
              return match;
            });
            source2 += "';\n";
            var variable = hasOwnProperty.call(options, "variable") && options.variable;
            if (!variable) {
              source2 = "with (obj) {\n" + source2 + "\n}\n";
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source2 = (isEvaluating ? source2.replace(reEmptyStringLeading, "") : source2).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source2 = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source2 + "return __p\n}";
            var result2 = attempt(function() {
              return Function2(importsKeys, sourceURL + "return " + source2).apply(undefined$1, importsValues);
            });
            result2.source = source2;
            if (isError2(result2)) {
              throw result2;
            }
            return result2;
          }
          function toLower(value) {
            return toString(value).toLowerCase();
          }
          function toUpper(value) {
            return toString(value).toUpperCase();
          }
          function trim(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined$1)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
          }
          function trimEnd(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined$1)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
          }
          function trimStart(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined$1)) {
              return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
          }
          function truncate(string, options) {
            var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject(options)) {
              var separator = "separator" in options ? options.separator : separator;
              length = "length" in options ? toInteger(options.length) : length;
              omission = "omission" in options ? baseToString(options.omission) : omission;
            }
            string = toString(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length >= strLength) {
              return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
            if (separator === undefined$1) {
              return result2 + omission;
            }
            if (strSymbols) {
              end += result2.length - end;
            }
            if (isRegExp(separator)) {
              if (string.slice(end).search(separator)) {
                var match, substring = result2;
                if (!separator.global) {
                  separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
                }
                separator.lastIndex = 0;
                while (match = separator.exec(substring)) {
                  var newEnd = match.index;
                }
                result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index2 = result2.lastIndexOf(separator);
              if (index2 > -1) {
                result2 = result2.slice(0, index2);
              }
            }
            return result2 + omission;
          }
          function unescape(string) {
            string = toString(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          var upperCase = createCompounder(function(result2, word, index2) {
            return result2 + (index2 ? " " : "") + word.toUpperCase();
          });
          var upperFirst = createCaseFirst("toUpperCase");
          function words(string, pattern, guard) {
            string = toString(string);
            pattern = guard ? undefined$1 : pattern;
            if (pattern === undefined$1) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          var attempt = baseRest(function(func, args) {
            try {
              return apply(func, undefined$1, args);
            } catch (e) {
              return isError2(e) ? e : new Error2(e);
            }
          });
          var bindAll = flatRest(function(object, methodNames) {
            arrayEach(methodNames, function(key2) {
              key2 = toKey(key2);
              baseAssignValue(object, key2, bind(object[key2], object));
            });
            return object;
          });
          function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length ? [] : arrayMap(pairs, function(pair) {
              if (typeof pair[1] != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              return [toIteratee(pair[0]), pair[1]];
            });
            return baseRest(function(args) {
              var index2 = -1;
              while (++index2 < length) {
                var pair = pairs[index2];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          function conforms(source2) {
            return baseConforms(baseClone(source2, CLONE_DEEP_FLAG));
          }
          function constant(value) {
            return function() {
              return value;
            };
          }
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          function matches(source2) {
            return baseMatches(baseClone(source2, CLONE_DEEP_FLAG));
          }
          function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          var method = baseRest(function(path, args) {
            return function(object) {
              return baseInvoke(object, path, args);
            };
          });
          var methodOf = baseRest(function(object, args) {
            return function(path) {
              return baseInvoke(object, path, args);
            };
          });
          function mixin(object, source2, options) {
            var props = keys(source2), methodNames = baseFunctions(source2, props);
            if (options == null && !(isObject(source2) && (methodNames.length || !props.length))) {
              options = source2;
              source2 = object;
              object = this;
              methodNames = baseFunctions(source2, keys(source2));
            }
            var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
            arrayEach(methodNames, function(methodName) {
              var func = source2[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function() {
                  var chainAll = this.__chain__;
                  if (chain2 || chainAll) {
                    var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                    actions.push({ "func": func, "args": arguments, "thisArg": object });
                    result2.__chain__ = chainAll;
                    return result2;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }
            });
            return object;
          }
          function noConflict() {
            if (root2._ === this) {
              root2._ = oldDash;
            }
            return this;
          }
          function noop2() {
          }
          function nthArg(n) {
            n = toInteger(n);
            return baseRest(function(args) {
              return baseNth(args, n);
            });
          }
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path) {
            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
          }
          function propertyOf(object) {
            return function(path) {
              return object == null ? undefined$1 : baseGet(object, path);
            };
          }
          var range = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          function stubFalse() {
            return false;
          }
          function stubObject() {
            return {};
          }
          function stubString() {
            return "";
          }
          function stubTrue() {
            return true;
          }
          function times(n, iteratee2) {
            n = toInteger(n);
            if (n < 1 || n > MAX_SAFE_INTEGER) {
              return [];
            }
            var index2 = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n -= MAX_ARRAY_LENGTH;
            var result2 = baseTimes(length, iteratee2);
            while (++index2 < n) {
              iteratee2(index2);
            }
            return result2;
          }
          function toPath(value) {
            if (isArray(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
          }
          function uniqueId(prefix) {
            var id = ++idCounter;
            return toString(prefix) + id;
          }
          var add = createMathOperation(function(augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound("ceil");
          var divide = createMathOperation(function(dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound("floor");
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
          }
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$1;
          }
          function mean(array) {
            return baseMean(array, identity);
          }
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
          }
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$1;
          }
          var multiply = createMathOperation(function(multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound("round");
          var subtract = createMathOperation(function(minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          lodash2.after = after;
          lodash2.ary = ary;
          lodash2.assign = assign;
          lodash2.assignIn = assignIn;
          lodash2.assignInWith = assignInWith;
          lodash2.assignWith = assignWith;
          lodash2.at = at;
          lodash2.before = before;
          lodash2.bind = bind;
          lodash2.bindAll = bindAll;
          lodash2.bindKey = bindKey;
          lodash2.castArray = castArray;
          lodash2.chain = chain;
          lodash2.chunk = chunk;
          lodash2.compact = compact;
          lodash2.concat = concat;
          lodash2.cond = cond;
          lodash2.conforms = conforms;
          lodash2.constant = constant;
          lodash2.countBy = countBy;
          lodash2.create = create;
          lodash2.curry = curry;
          lodash2.curryRight = curryRight;
          lodash2.debounce = debounce;
          lodash2.defaults = defaults;
          lodash2.defaultsDeep = defaultsDeep;
          lodash2.defer = defer;
          lodash2.delay = delay;
          lodash2.difference = difference;
          lodash2.differenceBy = differenceBy;
          lodash2.differenceWith = differenceWith;
          lodash2.drop = drop;
          lodash2.dropRight = dropRight;
          lodash2.dropRightWhile = dropRightWhile;
          lodash2.dropWhile = dropWhile;
          lodash2.fill = fill;
          lodash2.filter = filter;
          lodash2.flatMap = flatMap;
          lodash2.flatMapDeep = flatMapDeep;
          lodash2.flatMapDepth = flatMapDepth;
          lodash2.flatten = flatten2;
          lodash2.flattenDeep = flattenDeep;
          lodash2.flattenDepth = flattenDepth;
          lodash2.flip = flip;
          lodash2.flow = flow;
          lodash2.flowRight = flowRight;
          lodash2.fromPairs = fromPairs;
          lodash2.functions = functions;
          lodash2.functionsIn = functionsIn;
          lodash2.groupBy = groupBy;
          lodash2.initial = initial;
          lodash2.intersection = intersection;
          lodash2.intersectionBy = intersectionBy;
          lodash2.intersectionWith = intersectionWith;
          lodash2.invert = invert;
          lodash2.invertBy = invertBy;
          lodash2.invokeMap = invokeMap;
          lodash2.iteratee = iteratee;
          lodash2.keyBy = keyBy;
          lodash2.keys = keys;
          lodash2.keysIn = keysIn;
          lodash2.map = map;
          lodash2.mapKeys = mapKeys;
          lodash2.mapValues = mapValues;
          lodash2.matches = matches;
          lodash2.matchesProperty = matchesProperty;
          lodash2.memoize = memoize;
          lodash2.merge = merge;
          lodash2.mergeWith = mergeWith;
          lodash2.method = method;
          lodash2.methodOf = methodOf;
          lodash2.mixin = mixin;
          lodash2.negate = negate;
          lodash2.nthArg = nthArg;
          lodash2.omit = omit;
          lodash2.omitBy = omitBy;
          lodash2.once = once;
          lodash2.orderBy = orderBy;
          lodash2.over = over;
          lodash2.overArgs = overArgs;
          lodash2.overEvery = overEvery;
          lodash2.overSome = overSome;
          lodash2.partial = partial;
          lodash2.partialRight = partialRight;
          lodash2.partition = partition;
          lodash2.pick = pick;
          lodash2.pickBy = pickBy;
          lodash2.property = property;
          lodash2.propertyOf = propertyOf;
          lodash2.pull = pull;
          lodash2.pullAll = pullAll;
          lodash2.pullAllBy = pullAllBy;
          lodash2.pullAllWith = pullAllWith;
          lodash2.pullAt = pullAt;
          lodash2.range = range;
          lodash2.rangeRight = rangeRight;
          lodash2.rearg = rearg;
          lodash2.reject = reject;
          lodash2.remove = remove;
          lodash2.rest = rest;
          lodash2.reverse = reverse;
          lodash2.sampleSize = sampleSize;
          lodash2.set = set2;
          lodash2.setWith = setWith;
          lodash2.shuffle = shuffle;
          lodash2.slice = slice;
          lodash2.sortBy = sortBy;
          lodash2.sortedUniq = sortedUniq;
          lodash2.sortedUniqBy = sortedUniqBy;
          lodash2.split = split;
          lodash2.spread = spread;
          lodash2.tail = tail;
          lodash2.take = take;
          lodash2.takeRight = takeRight;
          lodash2.takeRightWhile = takeRightWhile;
          lodash2.takeWhile = takeWhile;
          lodash2.tap = tap;
          lodash2.throttle = throttle;
          lodash2.thru = thru;
          lodash2.toArray = toArray;
          lodash2.toPairs = toPairs;
          lodash2.toPairsIn = toPairsIn;
          lodash2.toPath = toPath;
          lodash2.toPlainObject = toPlainObject;
          lodash2.transform = transform;
          lodash2.unary = unary;
          lodash2.union = union;
          lodash2.unionBy = unionBy;
          lodash2.unionWith = unionWith;
          lodash2.uniq = uniq;
          lodash2.uniqBy = uniqBy;
          lodash2.uniqWith = uniqWith;
          lodash2.unset = unset;
          lodash2.unzip = unzip;
          lodash2.unzipWith = unzipWith;
          lodash2.update = update2;
          lodash2.updateWith = updateWith;
          lodash2.values = values;
          lodash2.valuesIn = valuesIn;
          lodash2.without = without;
          lodash2.words = words;
          lodash2.wrap = wrap;
          lodash2.xor = xor;
          lodash2.xorBy = xorBy;
          lodash2.xorWith = xorWith;
          lodash2.zip = zip;
          lodash2.zipObject = zipObject;
          lodash2.zipObjectDeep = zipObjectDeep;
          lodash2.zipWith = zipWith;
          lodash2.entries = toPairs;
          lodash2.entriesIn = toPairsIn;
          lodash2.extend = assignIn;
          lodash2.extendWith = assignInWith;
          mixin(lodash2, lodash2);
          lodash2.add = add;
          lodash2.attempt = attempt;
          lodash2.camelCase = camelCase;
          lodash2.capitalize = capitalize;
          lodash2.ceil = ceil;
          lodash2.clamp = clamp2;
          lodash2.clone = clone;
          lodash2.cloneDeep = cloneDeep;
          lodash2.cloneDeepWith = cloneDeepWith;
          lodash2.cloneWith = cloneWith;
          lodash2.conformsTo = conformsTo;
          lodash2.deburr = deburr;
          lodash2.defaultTo = defaultTo;
          lodash2.divide = divide;
          lodash2.endsWith = endsWith;
          lodash2.eq = eq;
          lodash2.escape = escape2;
          lodash2.escapeRegExp = escapeRegExp;
          lodash2.every = every;
          lodash2.find = find;
          lodash2.findIndex = findIndex;
          lodash2.findKey = findKey;
          lodash2.findLast = findLast;
          lodash2.findLastIndex = findLastIndex;
          lodash2.findLastKey = findLastKey;
          lodash2.floor = floor;
          lodash2.forEach = forEach;
          lodash2.forEachRight = forEachRight;
          lodash2.forIn = forIn;
          lodash2.forInRight = forInRight;
          lodash2.forOwn = forOwn;
          lodash2.forOwnRight = forOwnRight;
          lodash2.get = get2;
          lodash2.gt = gt;
          lodash2.gte = gte;
          lodash2.has = has;
          lodash2.hasIn = hasIn;
          lodash2.head = head;
          lodash2.identity = identity;
          lodash2.includes = includes;
          lodash2.indexOf = indexOf;
          lodash2.inRange = inRange;
          lodash2.invoke = invoke;
          lodash2.isArguments = isArguments;
          lodash2.isArray = isArray;
          lodash2.isArrayBuffer = isArrayBuffer;
          lodash2.isArrayLike = isArrayLike;
          lodash2.isArrayLikeObject = isArrayLikeObject;
          lodash2.isBoolean = isBoolean;
          lodash2.isBuffer = isBuffer;
          lodash2.isDate = isDate;
          lodash2.isElement = isElement;
          lodash2.isEmpty = isEmpty;
          lodash2.isEqual = isEqual;
          lodash2.isEqualWith = isEqualWith;
          lodash2.isError = isError2;
          lodash2.isFinite = isFinite;
          lodash2.isFunction = isFunction;
          lodash2.isInteger = isInteger;
          lodash2.isLength = isLength;
          lodash2.isMap = isMap;
          lodash2.isMatch = isMatch;
          lodash2.isMatchWith = isMatchWith;
          lodash2.isNaN = isNaN;
          lodash2.isNative = isNative;
          lodash2.isNil = isNil;
          lodash2.isNull = isNull;
          lodash2.isNumber = isNumber;
          lodash2.isObject = isObject;
          lodash2.isObjectLike = isObjectLike;
          lodash2.isPlainObject = isPlainObject;
          lodash2.isRegExp = isRegExp;
          lodash2.isSafeInteger = isSafeInteger;
          lodash2.isSet = isSet;
          lodash2.isString = isString;
          lodash2.isSymbol = isSymbol;
          lodash2.isTypedArray = isTypedArray;
          lodash2.isUndefined = isUndefined;
          lodash2.isWeakMap = isWeakMap;
          lodash2.isWeakSet = isWeakSet;
          lodash2.join = join;
          lodash2.kebabCase = kebabCase;
          lodash2.last = last;
          lodash2.lastIndexOf = lastIndexOf;
          lodash2.lowerCase = lowerCase;
          lodash2.lowerFirst = lowerFirst;
          lodash2.lt = lt;
          lodash2.lte = lte;
          lodash2.max = max;
          lodash2.maxBy = maxBy;
          lodash2.mean = mean;
          lodash2.meanBy = meanBy;
          lodash2.min = min;
          lodash2.minBy = minBy;
          lodash2.stubArray = stubArray;
          lodash2.stubFalse = stubFalse;
          lodash2.stubObject = stubObject;
          lodash2.stubString = stubString;
          lodash2.stubTrue = stubTrue;
          lodash2.multiply = multiply;
          lodash2.nth = nth;
          lodash2.noConflict = noConflict;
          lodash2.noop = noop2;
          lodash2.now = now;
          lodash2.pad = pad;
          lodash2.padEnd = padEnd;
          lodash2.padStart = padStart;
          lodash2.parseInt = parseInt2;
          lodash2.random = random;
          lodash2.reduce = reduce;
          lodash2.reduceRight = reduceRight;
          lodash2.repeat = repeat;
          lodash2.replace = replace;
          lodash2.result = result;
          lodash2.round = round;
          lodash2.runInContext = runInContext2;
          lodash2.sample = sample;
          lodash2.size = size;
          lodash2.snakeCase = snakeCase;
          lodash2.some = some;
          lodash2.sortedIndex = sortedIndex;
          lodash2.sortedIndexBy = sortedIndexBy;
          lodash2.sortedIndexOf = sortedIndexOf;
          lodash2.sortedLastIndex = sortedLastIndex;
          lodash2.sortedLastIndexBy = sortedLastIndexBy;
          lodash2.sortedLastIndexOf = sortedLastIndexOf;
          lodash2.startCase = startCase;
          lodash2.startsWith = startsWith;
          lodash2.subtract = subtract;
          lodash2.sum = sum;
          lodash2.sumBy = sumBy;
          lodash2.template = template;
          lodash2.times = times;
          lodash2.toFinite = toFinite;
          lodash2.toInteger = toInteger;
          lodash2.toLength = toLength;
          lodash2.toLower = toLower;
          lodash2.toNumber = toNumber;
          lodash2.toSafeInteger = toSafeInteger;
          lodash2.toString = toString;
          lodash2.toUpper = toUpper;
          lodash2.trim = trim;
          lodash2.trimEnd = trimEnd;
          lodash2.trimStart = trimStart;
          lodash2.truncate = truncate;
          lodash2.unescape = unescape;
          lodash2.uniqueId = uniqueId;
          lodash2.upperCase = upperCase;
          lodash2.upperFirst = upperFirst;
          lodash2.each = forEach;
          lodash2.eachRight = forEachRight;
          lodash2.first = head;
          mixin(lodash2, (function() {
            var source2 = {};
            baseForOwn(lodash2, function(func, methodName) {
              if (!hasOwnProperty.call(lodash2.prototype, methodName)) {
                source2[methodName] = func;
              }
            });
            return source2;
          })(), { "chain": false });
          lodash2.VERSION = VERSION2;
          arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
            lodash2[methodName].placeholder = lodash2;
          });
          arrayEach(["drop", "take"], function(methodName, index2) {
            LazyWrapper.prototype[methodName] = function(n) {
              n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);
              var result2 = this.__filtered__ && !index2 ? new LazyWrapper(this) : this.clone();
              if (result2.__filtered__) {
                result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
              } else {
                result2.__views__.push({
                  "size": nativeMin(n, MAX_ARRAY_LENGTH),
                  "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
                });
              }
              return result2;
            };
            LazyWrapper.prototype[methodName + "Right"] = function(n) {
              return this.reverse()[methodName](n).reverse();
            };
          });
          arrayEach(["filter", "map", "takeWhile"], function(methodName, index2) {
            var type = index2 + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee2) {
              var result2 = this.clone();
              result2.__iteratees__.push({
                "iteratee": getIteratee(iteratee2, 3),
                "type": type
              });
              result2.__filtered__ = result2.__filtered__ || isFilter;
              return result2;
            };
          });
          arrayEach(["head", "last"], function(methodName, index2) {
            var takeName = "take" + (index2 ? "Right" : "");
            LazyWrapper.prototype[methodName] = function() {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach(["initial", "tail"], function(methodName, index2) {
            var dropName = "drop" + (index2 ? "" : "Right");
            LazyWrapper.prototype[methodName] = function() {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function(predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function(predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
            if (typeof path == "function") {
              return new LazyWrapper(this);
            }
            return this.map(function(value) {
              return baseInvoke(value, path, args);
            });
          });
          LazyWrapper.prototype.reject = function(predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function(start, end) {
            start = toInteger(start);
            var result2 = this;
            if (result2.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(result2);
            }
            if (start < 0) {
              result2 = result2.takeRight(-start);
            } else if (start) {
              result2 = result2.drop(start);
            }
            if (end !== undefined$1) {
              end = toInteger(end);
              result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
            }
            return result2;
          };
          LazyWrapper.prototype.takeRightWhile = function(predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function() {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash2.prototype[methodName] = function() {
              var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
              var interceptor = function(value2) {
                var result3 = lodashFunc.apply(lodash2, arrayPush([value2], args));
                return isTaker && chainAll ? result3[0] : result3;
              };
              if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var result2 = func.apply(value, args);
                result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
                return new LodashWrapper(result2, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              result2 = this.thru(interceptor);
              return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
            };
          });
          arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash2.prototype[methodName] = function() {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray(value) ? value : [], args);
              }
              return this[chainName](function(value2) {
                return func.apply(isArray(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash2[methodName];
            if (lodashFunc) {
              var key2 = lodashFunc.name + "";
              if (!hasOwnProperty.call(realNames, key2)) {
                realNames[key2] = [];
              }
              realNames[key2].push({ "name": methodName, "func": lodashFunc });
            }
          });
          realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
            "name": "wrapper",
            "func": undefined$1
          }];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash2.prototype.at = wrapperAt;
          lodash2.prototype.chain = wrapperChain;
          lodash2.prototype.commit = wrapperCommit;
          lodash2.prototype.next = wrapperNext;
          lodash2.prototype.plant = wrapperPlant;
          lodash2.prototype.reverse = wrapperReverse;
          lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
          lodash2.prototype.first = lodash2.prototype.head;
          if (symIterator) {
            lodash2.prototype[symIterator] = wrapperToIterator;
          }
          return lodash2;
        });
        var _ = runInContext();
        if (freeModule) {
          (freeModule.exports = _)._ = _;
          freeExports._ = _;
        } else {
          root2._ = _;
        }
      }).call(lodash);
    })(lodash$1, lodash$1.exports);
    return lodash$1.exports;
  }
  var lodashExports = requireLodash();
  const myCard = (() => {
    let confettiIsActive = writable(false);
    let firstAnswerIsHere = false;
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    function notifyParent(type) {
      let msg = { _ankiCardId: id, type };
      window.parent.postMessage(msg, "*");
    }
    function confetti() {
      confettiIsActive.set(false);
      requestAnimationFrame(() => {
        confettiIsActive.set(true);
      });
    }
    function handleFirstAnswer(correct) {
      if (firstAnswerIsHere) return;
      firstAnswerIsHere = true;
      if (correct) {
        confetti();
        notifyParent("right-answer");
        notifyParent("card-complete");
      } else {
        notifyParent("wrong-answer");
      }
    }
    return {
      id,
      confettiIsActive,
      notifyParent,
      confetti,
      handleFirstAnswer
    };
  })();
  var on_click$2 = (_, clicked2, indx) => clicked2(indx());
  var root_2$5 = /* @__PURE__ */ from_html(`<span class="ans-letter"> </span>`);
  var root_1$a = /* @__PURE__ */ from_html(`<button></button>`);
  var root_5$1 = /* @__PURE__ */ from_html(`<span> </span>`);
  var root_4$1 = /* @__PURE__ */ from_html(`<div class="row svelte-qx0naz"><span class="label svelte-qx0naz"> </span> <div class="cells svelte-qx0naz"></div></div>`);
  var root_3$2 = /* @__PURE__ */ from_html(`<div></div>`);
  var root_6 = /* @__PURE__ */ from_html(`<div class="case ml-4 mt-4 badge badge-accent svelte-qx0naz">A = a</div>`);
  var root_7$3 = /* @__PURE__ */ from_html(`<div class="case ml-4 mt-4 badge badge-accent svelte-qx0naz">A ≠ a</div>`);
  var root$m = /* @__PURE__ */ from_html(`<!> <!> <!> <div class="answers grid2x2 svelte-qx0naz"><!> <!> <!> <!></div> <!>`, 1);
  const $$css$n = {
    hash: "svelte-qx0naz",
    code: ".case.svelte-qx0naz {font-weight:bold;font-size:18px;}.main-desk.svelte-qx0naz {margin-top:12px;zoom:1;}.answer-btn.svelte-qx0naz {display:flex;gap:8px;align-items:center;}.answer-desk.svelte-qx0naz {margin-top:16px;margin-left:35%;width:60%;zoom:0.6;}.grid2x2.svelte-qx0naz {display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;width:100%;height:100%;}.grid2x2.svelte-qx0naz > button:where(.svelte-qx0naz) {justify-self:center;align-self:center;padding:1px 4px;}.answers.svelte-qx0naz {width:80%;margin-top:12px;margin-left:10%;}.row.svelte-qx0naz {display:flex;align-items:center;margin:8px 2px;}.label.svelte-qx0naz {width:40px;text-align:right;margin-right:10px;margin-left:1px;font-family:monospace;font-size:22px;}.cells.svelte-qx0naz {display:flex;border:1px solid #000;}.cell.svelte-qx0naz {width:48px;height:42px;border-left:1px solid #000;display:flex;align-items:center;justify-content:center;font-size:28px;}.cell.svelte-qx0naz:first-child {border-left:none;}.red.svelte-qx0naz {color:red;}"
  };
  function Wordle($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$n);
    const ansbtn = ($$anchor2, indx = noop) => {
      var button = root_1$a();
      const color = /* @__PURE__ */ user_derived(() => btnColor(indx()));
      const word = /* @__PURE__ */ user_derived(() => answers[indx()]);
      button.__click = [on_click$2, clicked2, indx];
      each(button, 21, () => get$1(word), index, ($$anchor3, n) => {
        var span = root_2$5();
        var text2 = child(span, true);
        reset(span);
        template_effect(($0) => set_text(text2, $0), [() => viewAt(get$1(n))]);
        append($$anchor3, span);
      });
      reset(button);
      template_effect(() => set_class(
        button,
        1,
        `answer-btn text-xl font-medium border rounded
        bg-${get$1(color)}-100 text-gray-900
        hover:bg-${get$1(color)}-200`,
        "svelte-qx0naz"
      ));
      append($$anchor2, button);
    };
    const desk = ($$anchor2, words = noop, right2 = noop, deskClass = noop) => {
      var div = root_3$2();
      each(div, 21, words, index, ($$anchor3, word) => {
        var div_1 = root_4$1();
        const cnt = /* @__PURE__ */ user_derived(() => countBulls(get$1(word), right2()));
        var span_1 = child(div_1);
        var text_1 = child(span_1);
        reset(span_1);
        var div_2 = sibling(span_1, 2);
        each(div_2, 21, () => get$1(word), index, ($$anchor4, n) => {
          var span_2 = root_5$1();
          let classes;
          var text_2 = child(span_2, true);
          reset(span_2);
          template_effect(
            ($0, $1) => {
              classes = set_class(span_2, 1, "cell svelte-qx0naz", null, classes, $0);
              set_text(text_2, $1);
            },
            [
              () => ({ red: itsACow(right2(), get$1(n)) }),
              () => viewAt(get$1(n))
            ]
          );
          append($$anchor4, span_2);
        });
        reset(div_2);
        reset(div_1);
        template_effect(() => set_text(text_1, `[${get$1(cnt) ?? ""}]`));
        append($$anchor3, div_1);
      });
      reset(div);
      template_effect(() => set_class(div, 1, deskClass(), "svelte-qx0naz"));
      append($$anchor2, div);
    };
    let config = prop($$props, "config", 7);
    let caseInsensitive = config().withCase === 0;
    let caseSensitive = config().withCase === 1;
    let clickedAt = /* @__PURE__ */ state$1(-1);
    let rightIsClicked = /* @__PURE__ */ state$1(false);
    let current2 = lodashExports.sample(config().sets);
    let right = current2[3];
    let guesses = lodashExports.shuffle(current2.slice(0, 3));
    let answers = lodashExports.shuffle(current2.slice(3, 7));
    let alefbet = lodashExports.shuffle(lodashExports.sample(config().alefbets));
    applySensitivity();
    function applySensitivity() {
      if (caseSensitive) {
        let original = alefbet.slice();
        for (let i = 0; 2 * i < alefbet.length; i++) {
          let ch = original[i];
          alefbet[2 * i] = ch.toUpperCase();
          alefbet[2 * i + 1] = ch.toLowerCase();
        }
        alefbet.length = Math.max(...current2.flat()) + 1;
        alefbet.splice(0, alefbet.length, ...lodashExports.shuffle(alefbet));
      }
    }
    let btnState = /* @__PURE__ */ state$1(proxy([-1, -1, -1, -1]));
    function viewAt(n) {
      let ch = alefbet[n];
      if (caseInsensitive) {
        ch = lodashExports.random(0, 1) === 1 ? ch.toUpperCase() : ch.toLowerCase();
      }
      return ch;
    }
    function countBulls(word, right2) {
      let count = (word[0] === right2[0] ? 1 : 0) + (word[1] === right2[1] ? 1 : 0) + (word[2] === right2[2] ? 1 : 0) + (word[3] === right2[3] ? 1 : 0);
      return count;
    }
    function itsACow(line2, val) {
      return line2.includes(val);
    }
    function same(lhs, rhs) {
      return lodashExports.isEqual(lhs, rhs);
    }
    function btnColor(indx) {
      return get$1(btnState)[indx] === -1 ? "gray" : get$1(btnState)[indx] === 0 ? "red" : "green";
    }
    function clicked2(indx) {
      set(clickedAt, indx, true);
      set(rightIsClicked, same(answers[indx], right), true);
      for (let i = 0; i < 4; i++) {
        let yes = same(answers[i], right);
        get$1(btnState)[i] = yes ? 1 : i === indx ? 0 : -1;
      }
      myCard.handleFirstAnswer(get$1(rightIsClicked));
    }
    function completed() {
      return true;
    }
    var fragment = root$m();
    var node = first_child(fragment);
    {
      var consequent = ($$anchor2) => {
        var div_3 = root_6();
        append($$anchor2, div_3);
      };
      if_block(node, ($$render) => {
        if (caseInsensitive) $$render(consequent);
      });
    }
    var node_1 = sibling(node, 2);
    {
      var consequent_1 = ($$anchor2) => {
        var div_4 = root_7$3();
        append($$anchor2, div_4);
      };
      if_block(node_1, ($$render) => {
        if (caseSensitive) $$render(consequent_1);
      });
    }
    var node_2 = sibling(node_1, 2);
    desk(node_2, () => guesses, () => right, () => "main-desk");
    var div_5 = sibling(node_2, 2);
    var node_3 = child(div_5);
    ansbtn(node_3, () => 0);
    var node_4 = sibling(node_3, 2);
    ansbtn(node_4, () => 1);
    var node_5 = sibling(node_4, 2);
    ansbtn(node_5, () => 2);
    var node_6 = sibling(node_5, 2);
    ansbtn(node_6, () => 3);
    reset(div_5);
    var node_7 = sibling(div_5, 2);
    {
      var consequent_2 = ($$anchor2) => {
        const bgColor = /* @__PURE__ */ user_derived(() => get$1(rightIsClicked) ? "bg-green-50" : "bg-red-50");
        desk($$anchor2, () => guesses, () => answers[get$1(clickedAt)], () => `answer-desk ${get$1(bgColor)}`);
      };
      if_block(node_7, ($$render) => {
        if (get$1(clickedAt) >= 0 && !get$1(rightIsClicked)) $$render(consequent_2);
      });
    }
    append($$anchor, fragment);
    return pop$1({
      completed,
      get config() {
        return config();
      },
      set config($$value) {
        config($$value);
        flushSync();
      }
    });
  }
  delegate(["click"]);
  create_custom_element(Wordle, { config: {} }, [], ["completed"], true);
  function Drill_wordle($$anchor, $$props) {
    push$1($$props, true);
    let config = prop($$props, "config", 7), rounds = prop($$props, "rounds", 7);
    config(lib.parse(config()));
    rounds(rounds() || 1);
    let wordle;
    let card;
    bind_this(
      DrillCard($$anchor, {
        get rounds() {
          return rounds();
        },
        children: ($$anchor2, $$slotProps) => {
          bind_this(
            Wordle($$anchor2, {
              get config() {
                return config();
              }
            }),
            ($$value) => wordle = $$value,
            () => wordle
          );
        },
        $$slots: { default: true }
      }),
      ($$value) => card = $$value,
      () => card
    );
    return pop$1({
      get config() {
        return config();
      },
      set config($$value) {
        config($$value);
        flushSync();
      },
      get rounds() {
        return rounds();
      },
      set rounds($$value) {
        rounds($$value);
        flushSync();
      }
    });
  }
  customElements.define("drill-wordle", create_custom_element(Drill_wordle, { config: {}, rounds: {} }, [], [], false));
  var root$l = /* @__PURE__ */ from_html(`<div class="panel svelte-1nkqiir"><div><span><!></span></div></div>`);
  const $$css$m = {
    hash: "svelte-1nkqiir",
    code: ".panel.svelte-1nkqiir {display:flex;justify-content:center;}.heb.svelte-1nkqiir {direction:rtl;text-align:right;display:inline-block;width:90%;}"
  };
  function H($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$m);
    let clazz = prop($$props, "clazz", 7, ""), children = prop($$props, "children", 7);
    var div = root$l();
    var div_1 = child(div);
    var span = child(div_1);
    var node = child(span);
    snippet(node, children);
    reset(span);
    reset(div_1);
    reset(div);
    template_effect(() => set_class(div_1, 1, `heb ${clazz()}`, "svelte-1nkqiir"));
    append($$anchor, div);
    return pop$1({
      get clazz() {
        return clazz();
      },
      set clazz($$value = "") {
        clazz($$value);
        flushSync();
      },
      get children() {
        return children();
      },
      set children($$value) {
        children($$value);
        flushSync();
      }
    });
  }
  create_custom_element(H, { clazz: {}, children: {} }, [], [], true);
  function Q($$anchor, $$props) {
    push$1($$props, true);
    let children = prop($$props, "children", 7);
    H($$anchor, {
      clazz: "bg-green-100",
      children: ($$anchor2, $$slotProps) => {
        var fragment_1 = comment();
        var node = first_child(fragment_1);
        snippet(node, children);
        append($$anchor2, fragment_1);
      },
      $$slots: { default: true }
    });
    return pop$1({
      get children() {
        return children();
      },
      set children($$value) {
        children($$value);
        flushSync();
      }
    });
  }
  create_custom_element(Q, { children: {} }, [], [], true);
  const _ruleset = ($$anchor) => {
    H($$anchor, {
      clazz: "bg-yellow-100",
      children: ($$anchor2, $$slotProps) => {
        next();
        var text_2 = text();
        template_effect(() => set_text(text_2, _ruleset));
        append($$anchor2, text_2);
      },
      $$slots: { default: true }
    });
  };
  const _let = ($$anchor) => {
    H($$anchor, {
      clazz: "bg-blue-100",
      children: ($$anchor2, $$slotProps) => {
        next();
        var text_3 = text();
        text_3.nodeValue = llet;
        append($$anchor2, text_3);
      },
      $$slots: { default: true }
    });
  };
  const whatIsTrue = ($$anchor) => {
    H($$anchor, {
      clazz: "bg-gray-100",
      children: ($$anchor2, $$slotProps) => {
        next();
        var text_4 = text();
        text_4.nodeValue = state.questions[0];
        append($$anchor2, text_4);
      },
      $$slots: { default: true }
    });
  };
  const whatIsFalse = ($$anchor) => {
    next();
    var text_5 = text("What is false");
    append($$anchor, text_5);
  };
  const sureTrue = ($$anchor) => {
    next();
    var text_6 = text("Sure true");
    append($$anchor, text_6);
  };
  const sureFalse = ($$anchor) => {
    next();
    var text_7 = text("Sure false");
    append($$anchor, text_7);
  };
  const maybeTrue = ($$anchor) => {
    next();
    var text_8 = text("Maybe true");
    append($$anchor, text_8);
  };
  const isItTrue = ($$anchor) => {
    next();
    var text_9 = text("Is it true");
    append($$anchor, text_9);
  };
  var on_click$1 = (_, answerIsHere, text2) => answerIsHere(text2());
  var root_1$9 = /* @__PURE__ */ from_html(`<button> </button>`);
  var root$k = /* @__PURE__ */ from_html(`<div class="my-card svelte-1tx0ras"><!> <!> <!> <!> <!> <!></div>`);
  const $$css$l = {
    hash: "svelte-1tx0ras",
    code: ".my-card.svelte-1tx0ras {font-size:18px;}.ans-btn.svelte-1tx0ras {font-size:18px;padding:0px 10px;}"
  };
  function Grira($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$l);
    const ansBtn = ($$anchor2, text2 = noop, color = noop) => {
      var button = root_1$9();
      button.__click = [on_click$1, answerIsHere, text2];
      var text_1 = child(button, true);
      reset(button);
      template_effect(() => {
        set_class(
          button,
          1,
          `ans-btn text-xl font-medium border rounded
        bg-${color()}-100 text-gray-900
        hover:bg-${color()}-200`,
          "svelte-1tx0ras"
        );
        set_text(text_1, text2());
      });
      append($$anchor2, button);
    };
    let flow = prop($$props, "flow", 7), problemSet = prop($$props, "problemSet", 7);
    function answerIsHere(text2) {
    }
    var div = root$k();
    var node = child(div);
    _let(node);
    var node_1 = sibling(node, 2);
    _ruleset(node_1);
    var node_2 = sibling(node_1, 2);
    {
      var consequent = ($$anchor2) => {
        whatIsTrue($$anchor2);
      };
      var alternate_4 = ($$anchor2) => {
        var fragment_7 = comment();
        var node_3 = first_child(fragment_7);
        {
          var consequent_1 = ($$anchor3) => {
            whatIsFalse($$anchor3);
          };
          var alternate_3 = ($$anchor3) => {
            var fragment_9 = comment();
            var node_4 = first_child(fragment_9);
            {
              var consequent_2 = ($$anchor4) => {
                sureTrue($$anchor4);
              };
              var alternate_2 = ($$anchor4) => {
                var fragment_11 = comment();
                var node_5 = first_child(fragment_11);
                {
                  var consequent_3 = ($$anchor5) => {
                    sureFalse($$anchor5);
                  };
                  var alternate_1 = ($$anchor5) => {
                    var fragment_13 = comment();
                    var node_6 = first_child(fragment_13);
                    {
                      var consequent_4 = ($$anchor6) => {
                        maybeTrue($$anchor6);
                      };
                      var alternate = ($$anchor6) => {
                        var fragment_15 = comment();
                        var node_7 = first_child(fragment_15);
                        {
                          var consequent_5 = ($$anchor7) => {
                            isItTrue($$anchor7);
                          };
                          if_block(
                            node_7,
                            ($$render) => {
                              if (state.name === "is-it-true") $$render(consequent_5);
                            },
                            true
                          );
                        }
                        append($$anchor6, fragment_15);
                      };
                      if_block(
                        node_6,
                        ($$render) => {
                          if (state.name === "maybe-true") $$render(consequent_4);
                          else $$render(alternate, false);
                        },
                        true
                      );
                    }
                    append($$anchor5, fragment_13);
                  };
                  if_block(
                    node_5,
                    ($$render) => {
                      if (state.name === "sure-false") $$render(consequent_3);
                      else $$render(alternate_1, false);
                    },
                    true
                  );
                }
                append($$anchor4, fragment_11);
              };
              if_block(
                node_4,
                ($$render) => {
                  if (state.name === "sure-true") $$render(consequent_2);
                  else $$render(alternate_2, false);
                },
                true
              );
            }
            append($$anchor3, fragment_9);
          };
          if_block(
            node_3,
            ($$render) => {
              if (state.name === "what-is-false") $$render(consequent_1);
              else $$render(alternate_3, false);
            },
            true
          );
        }
        append($$anchor2, fragment_7);
      };
      if_block(node_2, ($$render) => {
        if (state.name === "what-is-true") $$render(consequent);
        else $$render(alternate_4, false);
      });
    }
    var node_8 = sibling(node_2, 2);
    H(node_8, {
      clazz: "bg-red-100",
      children: ($$anchor2, $$slotProps) => {
        next();
        var text_10 = text();
        text_10.nodeValue = maybe[0];
        append($$anchor2, text_10);
      },
      $$slots: { default: true }
    });
    var node_9 = sibling(node_8, 2);
    ansBtn(node_9, () => "yes", () => "green");
    var node_10 = sibling(node_9, 2);
    ansBtn(node_10, () => "no", () => "red");
    reset(div);
    append($$anchor, div);
    return pop$1({
      get flow() {
        return flow();
      },
      set flow($$value) {
        flow($$value);
        flushSync();
      },
      get problemSet() {
        return problemSet();
      },
      set problemSet($$value) {
        problemSet($$value);
        flushSync();
      }
    });
  }
  delegate(["click"]);
  create_custom_element(Grira, { flow: {}, problemSet: {} }, [], [], true);
  function Drill_grira($$anchor, $$props) {
    push$1($$props, true);
    let config = prop($$props, "config", 7), flow = prop($$props, "flow", 7), problemSet = prop($$props, "problemSet", 7), rounds = prop($$props, "rounds", 7);
    config(lib.parse(config()));
    flow(lib.parse(flow()));
    problemSet(lib.parse(problemSet()));
    rounds(rounds() || 1);
    let grira;
    let card;
    bind_this(
      DrillCard($$anchor, {
        get rounds() {
          return rounds();
        },
        children: ($$anchor2, $$slotProps) => {
          bind_this(
            Grira($$anchor2, {
              get flow() {
                return flow();
              },
              get problemSet() {
                return problemSet();
              }
            }),
            ($$value) => grira = $$value,
            () => grira
          );
        },
        $$slots: { default: true }
      }),
      ($$value) => card = $$value,
      () => card
    );
    return pop$1({
      get config() {
        return config();
      },
      set config($$value) {
        config($$value);
        flushSync();
      },
      get flow() {
        return flow();
      },
      set flow($$value) {
        flow($$value);
        flushSync();
      },
      get problemSet() {
        return problemSet();
      },
      set problemSet($$value) {
        problemSet($$value);
        flushSync();
      },
      get rounds() {
        return rounds();
      },
      set rounds($$value) {
        rounds($$value);
        flushSync();
      }
    });
  }
  customElements.define("drill-grira", create_custom_element(Drill_grira, { config: {}, flow: {}, problemSet: {}, rounds: {} }, [], [], false));
  function assert(expr) {
    if (expr()) return;
    console.error("ASSERT has failed: ", expr);
    throw new Error(`ASSERT has failed: ${expr}`);
  }
  const ticks = writable(0);
  let phase = /* @__PURE__ */ (() => {
    let _drillId = "";
    let _phases = [];
    let currentTick = 0;
    function tick() {
      assert(() => _drillId !== "");
      currentTick++;
      ticks.set(currentTick);
    }
    function untick() {
      if (currentTick === 0) return;
      assert(() => _drillId !== "");
      currentTick--;
      ticks.set(currentTick);
    }
    function start(drillId, phases) {
      _drillId = drillId;
      _phases = [...phases];
      currentTick = 0;
      ticks.set(0);
    }
    function reveal2() {
      currentTick = _phases.length + 3;
      ticks.set(currentTick);
    }
    function meAt(_, myPhase) {
      if (currentTick === 0) return { wrong: true, hint: false, right: false };
      if (currentTick === 1) return { wrong: false, hint: true, right: false };
      let phaseNo = currentTick - 2;
      if (phaseNo < _phases.length) {
        let currentPhase = _phases[phaseNo];
        return {
          wrong: false,
          hint: currentPhase < myPhase.get(),
          right: currentPhase >= myPhase.get()
        };
      }
      let tickNo = phaseNo - _phases.length;
      if (_phases.length === 0) tickNo++;
      return { wrong: false, hint: tickNo % 2 == 0, right: tickNo % 2 === 1 };
    }
    return { tick, untick, start, reveal: reveal2, meAt };
  })();
  let log = (() => {
    let lines = writable([]);
    let minLevel = "E";
    let stack2 = [];
    let levels = { "*": 100, "E": 0, "W": 1, "I": 2 };
    function write(level, msg) {
      if (levels[level] > levels[minLevel]) return;
      let ln = { level, msg };
      console.log(ln);
      lines.update((prev2) => [...prev2, ln]);
    }
    function setLevel(level) {
      if (level === void 0) return;
      if (!(level in levels)) {
        write("E", `Unknown log level: '${level}'`);
        return;
      }
      minLevel = level;
    }
    function pushLevel(level) {
      if (level === void 0 || !(level in levels)) return;
      stack2.push(minLevel);
      if (levels[level] < levels[minLevel]) return;
      minLevel = level;
    }
    function popLevel() {
      if (stack2.length === 0) return;
      minLevel = stack2.pop();
    }
    return {
      lines,
      setLevel,
      info: (msg) => write("I", msg),
      warn: (msg) => write("W", msg),
      error: (msg) => write("E", msg),
      pushLevel,
      popLevel
    };
  })();
  var root_1$8 = /* @__PURE__ */ from_html(`<div><span> </span> <span class="msg"> </span></div>`);
  var root$j = /* @__PURE__ */ from_html(`<div class="panel svelte-1ba5k7a"></div>`);
  const $$css$k = {
    hash: "svelte-1ba5k7a",
    code: ".panel.svelte-1ba5k7a {font-size:12px;font-family:monospace;background-color:white;color:black;}.info.svelte-1ba5k7a {color:black;}.warn.svelte-1ba5k7a {background-color:cornsilk;}.error.svelte-1ba5k7a {color:red;font-weight:bold;background-color:yellow;}"
  };
  function Logger($$anchor, $$props) {
    push$1($$props, false);
    append_styles$1($$anchor, $$css$k);
    const [$$stores, $$cleanup] = setup_stores();
    const $lines = () => store_get(lines, "$lines", $$stores);
    let lines = log.lines;
    init();
    var div = root$j();
    each(div, 5, $lines, index, ($$anchor2, ln) => {
      var div_1 = root_1$8();
      let classes;
      var span = child(div_1);
      var text2 = child(span, true);
      reset(span);
      var span_1 = sibling(span, 2);
      var text_1 = child(span_1, true);
      reset(span_1);
      reset(div_1);
      template_effect(
        ($0) => {
          classes = set_class(div_1, 1, "line svelte-1ba5k7a", null, classes, $0);
          set_text(text2, get$1(ln).level);
          set_text(text_1, get$1(ln).msg);
        },
        [
          () => ({
            info: get$1(ln).level === "I",
            warn: get$1(ln).level === "W",
            error: get$1(ln).level === "E"
          })
        ]
      );
      append($$anchor2, div_1);
    });
    reset(div);
    append($$anchor, div);
    pop$1();
    $$cleanup();
  }
  create_custom_element(Logger, {}, [], [], true);
  var root$i = /* @__PURE__ */ from_html(`<span class="svelte-h87r00"> </span>`);
  const $$css$j = {
    hash: "svelte-h87r00",
    code: "span.svelte-h87r00 {font-size:var(--line-no-font-size);color:gray;}"
  };
  function LineNo($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$j);
    let lineNo = prop($$props, "lineNo", 7);
    var span = root$i();
    var text2 = child(span, true);
    reset(span);
    template_effect(() => set_text(text2, lineNo()));
    append($$anchor, span);
    return pop$1({
      get lineNo() {
        return lineNo();
      },
      set lineNo($$value) {
        lineNo($$value);
        flushSync();
      }
    });
  }
  create_custom_element(LineNo, { lineNo: {} }, [], [], true);
  var root_1$7 = /* @__PURE__ */ from_html(`<div><!></div>`);
  var root_2$4 = /* @__PURE__ */ from_html(`<div class="svelte-gy0mow"><!></div>`);
  const $$css$i = {
    hash: "svelte-gy0mow",
    code: "div.svelte-gy0mow {transition:font-size var(--animation-time) ease,\r\n            opacity var(--animation-time) ease,\r\n            background-color var(--animation-time) ease,\r\n            text-decoration-color var(--animation-time) ease;}.right.svelte-gy0mow {font-size:0px;}"
  };
  function Line($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$i);
    const [$$stores, $$cleanup] = setup_stores();
    const $ticks = () => store_get(ticks, "$ticks", $$stores);
    let phaseNo = prop($$props, "phaseNo", 7), wrongLine = prop($$props, "wrongLine", 7), children = prop($$props, "children", 7);
    let meAt = /* @__PURE__ */ user_derived(() => phase.meAt($ticks(), phaseNo()));
    var fragment = comment();
    var node = first_child(fragment);
    {
      var consequent = ($$anchor2) => {
        var div = root_1$7();
        let classes;
        var node_1 = child(div);
        snippet(node_1, children);
        reset(div);
        template_effect(($0) => classes = set_class(div, 1, "svelte-gy0mow", null, classes, $0), [
          () => ({
            wrong: get$1(meAt).wrong,
            hint: get$1(meAt).hint,
            right: get$1(meAt).right
          })
        ]);
        append($$anchor2, div);
      };
      var alternate = ($$anchor2) => {
        var div_1 = root_2$4();
        var node_2 = child(div_1);
        snippet(node_2, children);
        reset(div_1);
        append($$anchor2, div_1);
      };
      if_block(node, ($$render) => {
        if (wrongLine()) $$render(consequent);
        else $$render(alternate, false);
      });
    }
    append($$anchor, fragment);
    var $$pop = pop$1({
      get phaseNo() {
        return phaseNo();
      },
      set phaseNo($$value) {
        phaseNo($$value);
        flushSync();
      },
      get wrongLine() {
        return wrongLine();
      },
      set wrongLine($$value) {
        wrongLine($$value);
        flushSync();
      },
      get children() {
        return children();
      },
      set children($$value) {
        children($$value);
        flushSync();
      }
    });
    $$cleanup();
    return $$pop;
  }
  create_custom_element(Line, { phaseNo: {}, wrongLine: {}, children: {} }, [], [], true);
  var root$h = /* @__PURE__ */ from_html(`<span class="svelte-1afycyp"> </span>`);
  const $$css$h = {
    hash: "svelte-1afycyp",
    code: "span.svelte-1afycyp {transition:font-size var(--animation-time) ease,\r\n            opacity var(--animation-time) ease,\r\n            background-color var(--animation-time) ease,\r\n            text-decoration-color var(--animation-time) ease;}"
  };
  function AsIs($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$h);
    let code = prop($$props, "code", 7);
    var span = root$h();
    var text2 = child(span, true);
    reset(span);
    template_effect(() => set_text(text2, code()));
    append($$anchor, span);
    return pop$1({
      get code() {
        return code();
      },
      set code($$value) {
        code($$value);
        flushSync();
      }
    });
  }
  create_custom_element(AsIs, { code: {} }, [], [], true);
  var root$g = /* @__PURE__ */ from_html(`<span> </span>`);
  const $$css$g = {
    hash: "svelte-1e9o2gl",
    code: "span.svelte-1e9o2gl {text-decoration-line:underline;text-decoration-style:wavy;text-decoration-thickness:1px;text-decoration-color:var(--color);text-underline-offset:0.2em;transition:font-size var(--animation-time) ease,\r\n            opacity var(--animation-time) ease,\r\n            background-color var(--animation-time) ease,\r\n            text-decoration-color var(--animation-time) ease,\r\n            text-decoration-color var(--animation-time) ease;}.is-empty.svelte-1e9o2gl {color:transparent;}.wrong.svelte-1e9o2gl {text-decoration-color:transparent;}.right.svelte-1e9o2gl {opacity:0;font-size:0px;text-decoration-color:transparent;}.rtl-tooltip.svelte-1e9o2gl::before {direction:rtl;text-align:right;}"
  };
  function WrongSpan($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$g);
    const [$$stores, $$cleanup] = setup_stores();
    const $ticks = () => store_get(ticks, "$ticks", $$stores);
    let phaseNo = prop($$props, "phaseNo", 7), code = prop($$props, "code", 7), color = prop($$props, "color", 7, "red"), hint = prop($$props, "hint", 7);
    let meAt = /* @__PURE__ */ user_derived(() => phase.meAt($ticks(), phaseNo()));
    let isEmpty = code().trim().length === 0;
    if (isEmpty) {
      code(
        code().replace(/ /g, ".")
        // spaces has no glyphes, so are not decorated
      );
    }
    var span = root$g();
    let classes;
    let styles;
    var text2 = child(span, true);
    reset(span);
    template_effect(
      ($0, $1) => {
        classes = set_class(span, 1, `tooltip-${hint()?.where ?? ""} rtl-tooltip`, "svelte-1e9o2gl", classes, $0);
        set_attribute(span, "data-tip", hint()?.text);
        styles = set_style(span, "", styles, $1);
        set_text(text2, code());
      },
      [
        () => ({
          "rtl-tooltip": hint()?.rtl,
          tooltip: get$1(meAt).hint,
          "is-empty": isEmpty,
          wrong: get$1(meAt).wrong,
          hint: get$1(meAt).hint,
          right: get$1(meAt).right
        }),
        () => ({ "--color": color() })
      ]
    );
    append($$anchor, span);
    var $$pop = pop$1({
      get phaseNo() {
        return phaseNo();
      },
      set phaseNo($$value) {
        phaseNo($$value);
        flushSync();
      },
      get code() {
        return code();
      },
      set code($$value) {
        code($$value);
        flushSync();
      },
      get color() {
        return color();
      },
      set color($$value = "red") {
        color($$value);
        flushSync();
      },
      get hint() {
        return hint();
      },
      set hint($$value) {
        hint($$value);
        flushSync();
      }
    });
    $$cleanup();
    return $$pop;
  }
  create_custom_element(WrongSpan, { phaseNo: {}, code: {}, color: {}, hint: {} }, [], [], true);
  var root$f = /* @__PURE__ */ from_html(`<span> </span>`);
  const $$css$f = {
    hash: "svelte-grh0vk",
    code: "span.svelte-grh0vk {transition:font-size var(--animation-time) ease,\r\n            opacity var(--animation-time) ease,\r\n            background-color var(--animation-time) ease,\r\n            text-decoration-color var(--animation-time) ease;}.wrong.svelte-grh0vk {opacity:0;font-size:0px;}.hint.svelte-grh0vk {opacity:0;font-size:0px;}.right.svelte-grh0vk {background-color:var(--right-color);}"
  };
  function RightSpan($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$f);
    const [$$stores, $$cleanup] = setup_stores();
    const $ticks = () => store_get(ticks, "$ticks", $$stores);
    let phaseNo = prop($$props, "phaseNo", 7), code = prop($$props, "code", 7);
    let meAt = /* @__PURE__ */ user_derived(() => phase.meAt($ticks(), phaseNo()));
    var span = root$f();
    let classes;
    var text2 = child(span, true);
    reset(span);
    template_effect(
      ($0) => {
        classes = set_class(span, 1, "svelte-grh0vk", null, classes, $0);
        set_text(text2, code());
      },
      [
        () => ({
          wrong: get$1(meAt).wrong,
          hint: get$1(meAt).hint,
          right: get$1(meAt).right
        })
      ]
    );
    append($$anchor, span);
    var $$pop = pop$1({
      get phaseNo() {
        return phaseNo();
      },
      set phaseNo($$value) {
        phaseNo($$value);
        flushSync();
      },
      get code() {
        return code();
      },
      set code($$value) {
        code($$value);
        flushSync();
      }
    });
    $$cleanup();
    return $$pop;
  }
  create_custom_element(RightSpan, { phaseNo: {}, code: {} }, [], [], true);
  var root$e = /* @__PURE__ */ from_html(`<span> </span>`);
  const $$css$e = {
    hash: "svelte-em0w11",
    code: "span.svelte-em0w11 {text-decoration-color:var(--color);text-decoration-line:underline;text-decoration-style:wavy;text-decoration-thickness:1px;text-underline-offset:0.2em;transition:font-size var(--animation-time) ease,\r\n            opacity var(--animation-time) ease,\r\n            background-color var(--animation-time) ease,\r\n            text-decoration-color var(--animation-time) ease;}.wrong.svelte-em0w11 {text-decoration-color:transparent;}.right.svelte-em0w11 {text-decoration-color:transparent;}.rtl-tooltip.svelte-em0w11::before {direction:rtl;text-align:right;}"
  };
  function Waved($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$e);
    const [$$stores, $$cleanup] = setup_stores();
    const $ticks = () => store_get(ticks, "$ticks", $$stores);
    let phaseNo = prop($$props, "phaseNo", 7), code = prop($$props, "code", 7), color = prop($$props, "color", 7, "red"), hint = prop($$props, "hint", 7);
    let meAt = /* @__PURE__ */ user_derived(() => phase.meAt($ticks(), phaseNo()));
    var span = root$e();
    let classes;
    let styles;
    var text2 = child(span, true);
    reset(span);
    template_effect(
      ($0, $1) => {
        classes = set_class(span, 1, `tooltip-${hint()?.where ?? ""}`, "svelte-em0w11", classes, $0);
        set_attribute(span, "data-tip", hint()?.text);
        styles = set_style(span, "", styles, $1);
        set_text(text2, code());
      },
      [
        () => ({
          "rtl-tooltip": hint()?.rtl,
          tooltip: get$1(meAt).hint,
          wrong: get$1(meAt).wrong,
          hint: get$1(meAt).hint,
          right: get$1(meAt).right
        }),
        () => ({ "--color": color() })
      ]
    );
    append($$anchor, span);
    var $$pop = pop$1({
      get phaseNo() {
        return phaseNo();
      },
      set phaseNo($$value) {
        phaseNo($$value);
        flushSync();
      },
      get code() {
        return code();
      },
      set code($$value) {
        code($$value);
        flushSync();
      },
      get color() {
        return color();
      },
      set color($$value = "red") {
        color($$value);
        flushSync();
      },
      get hint() {
        return hint();
      },
      set hint($$value) {
        hint($$value);
        flushSync();
      }
    });
    $$cleanup();
    return $$pop;
  }
  create_custom_element(Waved, { phaseNo: {}, code: {}, color: {}, hint: {} }, [], [], true);
  var root$d = /* @__PURE__ */ from_html(`<new-line></new-line>`, 2);
  const $$css$d = {
    hash: "svelte-1xhsnn0",
    code: "new-line.svelte-1xhsnn0 {display:block;}"
  };
  function NewLine($$anchor) {
    append_styles$1($$anchor, $$css$d);
    var new_line = root$d();
    set_class(new_line, 1, "svelte-1xhsnn0");
    append($$anchor, new_line);
  }
  create_custom_element(NewLine, {}, [], [], true);
  var root$c = /* @__PURE__ */ from_html(`<div><span class="line-no svelte-15o8w5g"></span><span> </span></div>`);
  const $$css$c = {
    hash: "svelte-15o8w5g",
    code: "div.svelte-15o8w5g {transition:font-size var(--animation-time) ease,\r\n            opacity var(--animation-time) ease,\r\n            background-color var(--animation-time) ease,\r\n            text-decoration-color var(--animation-time) ease;}.line-no.svelte-15o8w5g {font-size:var(--line-no-font-size);color:gray;}.wrong.svelte-15o8w5g {opacity:0;font-size:0px;}.hint.svelte-15o8w5g {opacity:0;font-size:0px;}.right.svelte-15o8w5g {background-color:var(--right-color);}"
  };
  function RightLine($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$c);
    const [$$stores, $$cleanup] = setup_stores();
    const $ticks = () => store_get(ticks, "$ticks", $$stores);
    let phaseNo = prop($$props, "phaseNo", 7), code = prop($$props, "code", 7);
    let meAt = /* @__PURE__ */ user_derived(() => phase.meAt($ticks(), phaseNo()));
    var div = root$c();
    let classes;
    var span = child(div);
    span.textContent = "    ";
    var span_1 = sibling(span);
    var text2 = child(span_1, true);
    reset(span_1);
    reset(div);
    template_effect(
      ($0) => {
        classes = set_class(div, 1, "svelte-15o8w5g", null, classes, $0);
        set_text(text2, code());
      },
      [
        () => ({
          wrong: get$1(meAt).wrong,
          hint: get$1(meAt).hint,
          right: get$1(meAt).right
        })
      ]
    );
    append($$anchor, div);
    var $$pop = pop$1({
      get phaseNo() {
        return phaseNo();
      },
      set phaseNo($$value) {
        phaseNo($$value);
        flushSync();
      },
      get code() {
        return code();
      },
      set code($$value) {
        code($$value);
        flushSync();
      }
    });
    $$cleanup();
    return $$pop;
  }
  create_custom_element(RightLine, { phaseNo: {}, code: {} }, [], [], true);
  var root$b = /* @__PURE__ */ from_html(`<span> </span>`);
  const $$css$b = {
    hash: "svelte-tj7gjt",
    code: "span.svelte-tj7gjt {transition:font-size var(--animation-time) ease,\r\n            opacity var(--animation-time) ease,\r\n            background-color var(--animation-time) ease,\r\n            text-decoration-color var(--animation-time) ease;}.right.svelte-tj7gjt {font-size:0px;}"
  };
  function LeftIndent($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$b);
    const [$$stores, $$cleanup] = setup_stores();
    const $ticks = () => store_get(ticks, "$ticks", $$stores);
    let phaseNo = prop($$props, "phaseNo", 7), spaceCount = prop($$props, "spaceCount", 7);
    let meAt = /* @__PURE__ */ user_derived(() => phase.meAt($ticks(), phaseNo()));
    let code = "".padStart(spaceCount());
    var span = root$b();
    let classes;
    var text2 = child(span, true);
    reset(span);
    template_effect(
      ($0) => {
        classes = set_class(span, 1, "svelte-tj7gjt", null, classes, $0);
        set_text(text2, code);
      },
      [
        () => ({
          wrong: get$1(meAt).wrong,
          hint: get$1(meAt).hint,
          right: get$1(meAt).right
        })
      ]
    );
    append($$anchor, span);
    var $$pop = pop$1({
      get phaseNo() {
        return phaseNo();
      },
      set phaseNo($$value) {
        phaseNo($$value);
        flushSync();
      },
      get spaceCount() {
        return spaceCount();
      },
      set spaceCount($$value) {
        spaceCount($$value);
        flushSync();
      }
    });
    $$cleanup();
    return $$pop;
  }
  create_custom_element(LeftIndent, { phaseNo: {}, spaceCount: {} }, [], [], true);
  var root$a = /* @__PURE__ */ from_html(`<span> </span>`);
  const $$css$a = {
    hash: "svelte-eg6z97",
    code: "span.svelte-eg6z97 {transition:font-size var(--animation-time) ease,\r\n            opacity var(--animation-time) ease,\r\n            background-color var(--animation-time) ease,\r\n            text-decoration-color var(--animation-time) ease;}.wrong.svelte-eg6z97 {font-size:0px;}.hint.svelte-eg6z97 {font-size:0px;}"
  };
  function RightIndent($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$a);
    const [$$stores, $$cleanup] = setup_stores();
    const $ticks = () => store_get(ticks, "$ticks", $$stores);
    let phaseNo = prop($$props, "phaseNo", 7), spaceCount = prop($$props, "spaceCount", 7);
    let meAt = /* @__PURE__ */ user_derived(() => phase.meAt($ticks(), phaseNo()));
    let code = "".padStart(spaceCount());
    var span = root$a();
    let classes;
    var text2 = child(span, true);
    reset(span);
    template_effect(
      ($0) => {
        classes = set_class(span, 1, "svelte-eg6z97", null, classes, $0);
        set_text(text2, code);
      },
      [
        () => ({
          wrong: get$1(meAt).wrong,
          hint: get$1(meAt).hint,
          right: get$1(meAt).right
        })
      ]
    );
    append($$anchor, span);
    var $$pop = pop$1({
      get phaseNo() {
        return phaseNo();
      },
      set phaseNo($$value) {
        phaseNo($$value);
        flushSync();
      },
      get spaceCount() {
        return spaceCount();
      },
      set spaceCount($$value) {
        spaceCount($$value);
        flushSync();
      }
    });
    $$cleanup();
    return $$pop;
  }
  create_custom_element(RightIndent, { phaseNo: {}, spaceCount: {} }, [], [], true);
  const hints = /* @__PURE__ */ (() => {
    let db = {};
    function makeHint(html) {
      let id = html.getAttribute("id");
      let dir = html.getAttribute("dir") || "ltr";
      let text2 = html.textContent.trim();
      if (!id) {
        log.warn(`Hint with no id; context='${text2}'`);
        return;
      }
      return { id, text: text2, dir };
    }
    function parseHtmlDocument(doc, external) {
      let count = 0;
      doc.querySelectorAll("hint").forEach((html) => {
        let hint = makeHint(html);
        if (!hint) return;
        if (db[hint.id] !== void 0) {
          if (external) return;
          log.warn(`Hint with same id='${hint.id}'`);
        }
        db[hint.id] = hint;
        count++;
      });
      return count;
    }
    function parseMyDocument() {
      let count = parseHtmlDocument(document, false);
      log.info(`Parsed ${count} hints`);
    }
    function importHints(from) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", from, false);
        xhr.send();
        if (xhr.status !== 200) {
          throw new Error("HTTP " + xhr.status);
        }
        if (!xhr.responseText) {
          throw new Error("Empty response");
        }
        let doc = new DOMParser().parseFromString(xhr.responseText, "text/html");
        let count = parseHtmlDocument(doc, true);
        log.info(`${from}: parsed ${count} hints`);
      } catch (err) {
        log.error(`Failed to load hints from '${from}' (${err.message})`);
      }
    }
    function get2(hintId) {
      let hint = db[hintId];
      return hint;
    }
    function names() {
      let ids = Object.keys(db);
      return ids.join(",");
    }
    return { parseMyDocument, importHints, get: get2, names };
  })();
  function Hint($$anchor) {
  }
  create_custom_element(Hint, {}, [], [], true);
  let shellChars = {
    java: "$",
    cs: "@",
    csharp: "@",
    "c#": "@",
    "python": "&",
    "js": "@",
    "javascript": "@"
  };
  function buildDrills() {
    let drills = [];
    function parseDrills() {
      let phaseNoRegex = /\{(\d+)\}(\!?)/;
      let phaseSwitchRegex = /\{\+\}/;
      function makeSrc(id, content, _$) {
        let lines = content.split(/\r?\n/);
        let lineNo = 0;
        let next2 = () => lineNo += lineNo < lines.length ? 1 : 0;
        let end = () => lineNo >= lines.length;
        function assert2(expr) {
          if (expr()) return;
          let msg = `Line ${lineNo}: ASSERT has failed: ${expr}`;
          log.error(msg);
          throw new Error(msg);
        }
        function hasHebrew(text2) {
          return /[\u0590-\u05FF]/.test(text2);
        }
        function line2() {
          if (lineNo >= lines.length) throw new Error(`Drill '${id}': no more source lines (${lines.length} lines)`);
          return lines[lineNo].trimEnd();
        }
        function skipEmptyLines() {
          if (lineNo >= lines.length) return;
          while (lineNo < lines.length) {
            let line22 = lines[lineNo];
            if (line22.trim().length > 0) return;
            lineNo++;
          }
        }
        function trimEnd$(str) {
          return str.endsWith(_$) ? str.substring(0, str.length - 1) : str;
        }
        function parseColor(ch) {
          let colors = { "r": "red", "o": "orange", "g": "green", "t": "transparent" };
          if (ch.length === 0) return "red";
          let color = colors[ch.toLowerCase()];
          if (!color) log.warn(`Line ${lineNo}: Unrecognized color '${ch}'`);
          return color || "red";
        }
        function parseWhere(ch, name) {
          let positions = {
            "u": "top",
            "t": "top",
            "a": "top",
            "d": "bottom",
            "b": "bottom",
            "l": "left",
            "r": "right",
            "top": "top",
            "up": "top",
            "above": "top",
            "bottom": "bottom",
            "below": "bottom",
            "down": "bottom",
            "left": "left",
            "right": "right"
          };
          ch ||= "";
          name ||= "";
          let where = positions[ch.toLocaleLowerCase()] || positions[name.toLocaleLowerCase()];
          if (!where) log.warn(`Line ${lineNo}: Unregocnized position '${ch}'`);
          return where || "bottom";
        }
        function parseHint(hintId, whereCh, whereName) {
          let hint = hints.get(hintId);
          return {
            id: hint ? hint.id : `${id}.${lineNo}`,
            text: hint ? hint.text : hintId,
            where: parseWhere(whereCh, whereName),
            rtl: hint ? hint.dir === "rtl" : hasHebrew(hintId)
          };
        }
        function asIsLine() {
          return !line2().includes(_$);
        }
        function rightLineRemoved() {
          return line2().startsWith("- ");
        }
        function wrongLineAdded() {
          return line2().startsWith("+ ");
        }
        function parse$Line() {
          let spans = lineWithNoMarkup().split(_$);
          assert2(() => spans.length > 1);
          let noOf$ = spans.length - 1;
          if (noOf$ % 2 != 0) {
            let argsLine = argumentLine();
            let msg = `Line ${lineNo}: Odd number of '${_$}' (${noOf$}); '${_$}'`;
            let why = argsLine ? `too many argument lines?` : `'${_$}' should come in pairs`;
            throw new Error(`${msg} (${why})`);
          }
          return spans;
        }
        function parseWaveColor() {
          let ch = /~(\w)(?:\s|$)/.exec(line2());
          if (!ch) return "red";
          return parseColor(ch[1]);
        }
        function parseHintProps() {
          let ln = lineWithNoMarkup();
          let wavedWithHint = /~(\w?\s*)(?:h(\w)|hint-(\w+))\s+(.+)/.exec(ln);
          if (!wavedWithHint) return void 0;
          let whereCh = wavedWithHint[2];
          let whereName = wavedWithHint[3];
          let hintId = wavedWithHint[4].split("^")[0].trimEnd();
          return parseHint(hintId, whereCh, whereName);
        }
        function replaceSpan() {
          return line2().indexOf("^") >= 0;
        }
        function parseReplacement() {
          let replacement = /\^(.*)/.exec(line2());
          assert2(() => replacement !== null);
          let span = replacement[1].split("~")[0].trimEnd();
          return trimEnd$(span);
        }
        let indentRegex = /^([+|-]\d\d?)\s?/;
        function parseIndent() {
          let indent = indentRegex.exec(line2());
          if (indent === null) return 0;
          return parseInt(indent[1]);
        }
        function lineWithNoMarkup() {
          let noMarkup = line2().replace(indentRegex, (match) => " ".repeat(match.length)).replace(phaseNoRegex, "").replace(phaseSwitchRegex, "");
          if (noMarkup[0] === "+" || noMarkup[0] === "-") noMarkup = " " + noMarkup.substring(1);
          return noMarkup;
        }
        function argumentLine() {
          let argPrefixes = ["^", "~"];
          let ln = line2().trim();
          for (let prefix of argPrefixes) {
            if (ln.startsWith(prefix)) return true;
          }
          return false;
        }
        function hasPhaseSwitch() {
          return phaseNoRegex.test(line2()) || phaseSwitchRegex.test(line2());
        }
        return {
          id,
          text: content,
          lines,
          line: () => lineWithNoMarkup(),
          lineWithMarkup: () => line2(),
          lineNo: () => lineNo,
          emptyLine: () => lines[lineNo].trim().length === 0,
          next: next2,
          end,
          assert: assert2,
          skipEmptyLines,
          trimEnd$,
          parseColor,
          parseWhere,
          parseHint,
          asIsLine,
          rightLineRemoved,
          wrongLineAdded,
          parse$Line,
          parseWaveColor,
          parseHintProps,
          replaceSpan,
          parseReplacement,
          parseIndent,
          argumentLine,
          hasPhaseSwitch
        };
      }
      function makeDrill(id, src) {
        let tokens = [];
        let lineNo = 0;
        function fixIndentation(code) {
          let leadingSpaces = 0;
          while (leadingSpaces < code.length) {
            if (code[leadingSpaces] != " ") break;
            leadingSpaces++;
          }
          switch (leadingSpaces % 4) {
            case 1:
              code = code.substring(1);
              break;
            case 3:
              code = " " + code;
              break;
          }
          return code;
        }
        function add(type, props) {
          let token2 = { type, props };
          tokens.push(token2);
        }
        function addLineNo() {
          lineNo++;
          let lnPrefix = lineNo.toString().padStart(2, " ").padEnd(4, " ");
          add("line-no", { lineNo: lnPrefix });
        }
        function addAsIsSpan(code) {
          add("as-is", { code });
        }
        function addReplaceSpan(phaseNo, rightSpan, wrongSpan, color, hint) {
          if (rightSpan.length > 0) add("right-span", { phaseNo, code: rightSpan });
          if (wrongSpan.length > 0) add("wrong-span", { phaseNo, code: wrongSpan, color, hint });
        }
        function addWavedSpan(phaseNo, span, color, hint) {
          if (span.length > 0) add("waved", { phaseNo, code: span, color, hint });
        }
        function addRightLine(phaseNo, code) {
          code = fixIndentation(code);
          add("right-line", { phaseNo, code });
        }
        function addIndent(phaseNo, indent) {
          if (indent === 0) return;
          if (indent < 0) {
            add("right-indent", { phaseNo, spaceCount: -indent });
          } else {
            add("left-indent", { phaseNo, spaceCount: indent });
          }
        }
        function addLine(wrongLine, phaseNo) {
          if (wrongLine) add("wrong-line", { phaseNo });
          else add("new-line", {});
          addLineNo();
        }
        return {
          id,
          tokens,
          addLine,
          addLineNo,
          addAsIsSpan,
          addReplaceSpan,
          addWavedSpan,
          addRightLine,
          addIndent
        };
      }
      function parseDrill(id, content, _$) {
        let phaseNo = (() => {
          function makePhaseNo(value) {
            return {
              get: () => value,
              set: (_) => value = _,
              toString: () => value
            };
          }
          let currentNo = 0;
          let currentPhase = makePhaseNo(currentNo);
          let explicits = /* @__PURE__ */ new Map();
          function next2(src2) {
            let line2 = src2.lineWithMarkup();
            currentNo++;
            let match = phaseNoRegex.exec(line2);
            if (match) {
              let explicitId = match[1];
              let setNow = match[2].length > 0;
              if (!explicits.has(explicitId)) {
                explicits.set(explicitId, makePhaseNo(currentNo));
              }
              currentPhase = explicits.get(explicitId);
              if (setNow) currentPhase.set(currentNo);
            } else {
              currentPhase = makePhaseNo(currentNo);
            }
          }
          return { next: next2, get: () => currentPhase };
        })();
        let src = makeSrc(id, content, _$);
        let drill = makeDrill(id);
        function applyIndent(indent, span) {
          if (!indent) return span;
          if (indent < 0) indent = -indent;
          return span.substring(indent);
        }
        log.info(`Parsing drill '${id}' $='${_$}' (${src.lines.length} lines)`);
        src.skipEmptyLines();
        while (!src.end()) {
          if (src.emptyLine()) {
            src.skipEmptyLines();
            if (!src.end()) {
              drill.addLine(false, phaseNo.get());
            }
            continue;
          }
          if (src.rightLineRemoved()) {
            phaseNo.next(src);
            drill.addRightLine(phaseNo.get(), src.line());
            src.next();
            continue;
          }
          let indent = src.parseIndent();
          let wrongLine = src.wrongLineAdded();
          if (src.asIsLine()) {
            if (wrongLine) phaseNo.next(src);
            drill.addLine(wrongLine, phaseNo.get());
            drill.addIndent(phaseNo.get(), indent);
            drill.addAsIsSpan(applyIndent(indent, src.line()));
            src.next();
            continue;
          }
          let spans = src.parse$Line();
          spans[0] = applyIndent(indent, spans[0]);
          phaseNo.next(src);
          drill.addLine(wrongLine, phaseNo.get());
          drill.addIndent(phaseNo.get(), indent);
          for (let i = 0; i < spans.length; i += 2) {
            let asIsSpan = spans[i];
            let rightSpan = spans[i + 1];
            if (asIsSpan.length > 0) {
              drill.addAsIsSpan(asIsSpan);
            }
            if (rightSpan !== void 0) {
              src.next();
              if (!src.argumentLine()) throw new Error(`Line: ${src.lineNo()}: Not enough arguments for previous line`);
              if (src.hasPhaseSwitch()) {
                phaseNo.next(src);
              }
              let color = src.parseWaveColor();
              let hint = src.parseHintProps();
              if (src.replaceSpan()) {
                let wrongSpan = src.parseReplacement();
                drill.addReplaceSpan(phaseNo.get(), rightSpan, wrongSpan, color, hint);
              } else {
                drill.addWavedSpan(phaseNo.get(), rightSpan, color, hint);
              }
            }
          }
          src.next();
        }
        return drill.tokens;
      }
      function buildDrill(id, tokens, atOnce) {
        let seenPhases = /* @__PURE__ */ new Set();
        function splitTokensToLines() {
          let line2 = null;
          let lines2 = [];
          for (let i = 0; i < tokens.length; i++) {
            let token2 = tokens[i];
            if ("phaseNo" in token2.props) seenPhases.add(token2.props.phaseNo.get());
            if (token2.type === "new-line") {
              line2 = { wrongLine: false, tokens: [] };
              lines2.push(line2);
            } else if (token2.type === "right-line") {
              line2 = { phaseNo: token2.props.phaseNo, wrongLine: false, tokens: [] };
              lines2.push(line2);
            } else if (token2.type === "wrong-line") {
              line2 = { phaseNo: token2.props.phaseNo, wrongLine: true, tokens: [] };
              lines2.push(line2);
              continue;
            }
            line2?.tokens.push(token2);
          }
          return lines2;
        }
        let lines = splitTokensToLines();
        let phases = [...seenPhases].sort((a, b) => a - b);
        if (atOnce) phases = [];
        console.log(`${id} is built:`, phases);
        return { id, atOnce, phases, tokens, lines };
      }
      let htmls = document.querySelectorAll("drill");
      log.info(`Found ${htmls.length} drills`);
      if (htmls.length === 0) throw new Error("No <drill></drill> are found");
      let ids = /* @__PURE__ */ new Set();
      htmls.forEach((el, no) => {
        let id = el.getAttribute("id") || `drill-${no + 1}`;
        if (ids.has(id)) throw new Error(`Two drills with a same id '${id}'`);
        ids.add(id);
        let lang = el.getAttribute("lang") || "java";
        let _$ = el.getAttribute("$") || shellChars[lang] || "$";
        let atOnce = el.hasAttribute("at-once");
        let logLevel = el.getAttribute("log-level") || "E";
        log.pushLevel(logLevel);
        try {
          let content = el.textContent;
          let tokens = parseDrill(id, content, _$);
          if (tokens.length === 0) throw new Error(`Drill is empty`);
          let drill = buildDrill(id, tokens, atOnce);
          drills.push(drill);
          log.info(`Drill '${id}' is parsed: ${tokens.length} tokens`);
        } catch (err) {
          console.log(err);
          log.error(`Failed to parse drill '${id}': ${err.message}`);
        } finally {
          log.popLevel();
        }
      });
      log.info(`Parsed ${drills.length} drills`);
      return drills;
    }
    try {
      hints.parseMyDocument();
      parseDrills();
    } catch (err) {
      console.log(err);
      log.error(err.message);
    }
    return drills;
  }
  function importantFirst(drills) {
    let reordered = [];
    drills.map((drill) => {
      if (drill.id.endsWith("!")) reordered.unshift(drill);
      else reordered.push(drill);
    });
    return reordered;
  }
  function orderDrills(drills, order, shuffle) {
    if (order.length === 0) return shuffle ? lodashExports.shuffle(drills) : importantFirst(drills);
    let ordered = [];
    let id2drill = /* @__PURE__ */ new Map();
    let shown = /* @__PURE__ */ new Set();
    drills.map((drill) => {
      id2drill.set(drill.id, drill);
    });
    order.map((id) => {
      let drill = id !== "$" ? id2drill.get(id) : drills[drills.length - 1];
      if (!drill) {
        log.error(`Can't show '${id}' drill: drill is not present`);
        return;
      }
      if (shown.has(id)) {
        log.warn(`Drill '${id}' is already in shown list (skipped)`);
        return;
      }
      ordered.push(drill);
      shown.add(id);
    });
    if (shuffle) ordered = lodashExports.shuffle(ordered);
    return ordered;
  }
  const prev = (_, setNo, indx) => setNo(get$1(indx) - 1);
  function again(__1, drill) {
    phase.start(get$1(drill).id, get$1(drill).phases);
  }
  function shuffleDrills(__2, shuffleCount, drills, setNo) {
    update(shuffleCount);
    set(drills, lodashExports.shuffle(get$1(drills)), true);
    setNo(0);
  }
  function reveal() {
    phase.reveal();
  }
  var root_7$2 = /* @__PURE__ */ from_html(`<br/>`);
  var root_8 = /* @__PURE__ */ from_html(`<div class="tooltip"><button></button></div>`);
  var root$9 = /* @__PURE__ */ from_html(`<!> <div class="code svelte-ur0zc1"><!></div> <div class="control svelte-ur0zc1"><button class="shuffle btn btn-xs btn-warning">Shuffle</button> <button>Prev</button> <button>Next</button> <button class="show btn btn-xs btn-outline btn-success">Reveal</button> <button class="again btn btn-xs btn-outline btn-error">Again</button> <!> <!></div>`, 1);
  const $$css$9 = {
    hash: "svelte-ur0zc1",
    code: ".code.svelte-ur0zc1 {position:relative;user-select:none;font-family:monospace;white-space:pre;font-size:18px;font-family:monospace;cursor:pointer;padding-bottom:50px;}.control.svelte-ur0zc1 {position:fixed;width:100%;bottom:0;font-size:14px;user-select:none;}.exact.svelte-ur0zc1 {margin:2px;}"
  };
  function Code_drills($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$9);
    let components = /* @__PURE__ */ new Map([
      ["line-no", LineNo],
      ["as-is", AsIs],
      ["wrong-span", WrongSpan],
      ["right-span", RightSpan],
      ["waved", Waved],
      ["new-line", NewLine],
      ["right-line", RightLine],
      ["left-indent", LeftIndent],
      ["right-indent", RightIndent]
    ]);
    let logLevel = prop($$props, "log-level", 7), show = prop($$props, "show", 7), shuffle = prop($$props, "shuffle", 7);
    if (logLevel()) log.setLevel(logLevel());
    let order = show() ? lib.parse(show()) : [];
    shuffle(shuffle() !== void 0);
    let drills = /* @__PURE__ */ state$1(proxy([]));
    let drill = /* @__PURE__ */ state$1(void 0);
    let indx = /* @__PURE__ */ state$1(0);
    let shuffleCount = /* @__PURE__ */ state$1(0);
    let refreshKey = /* @__PURE__ */ user_derived(() => `${get$1(shuffleCount)}-${get$1(indx)}`);
    function onclick2(e) {
      let target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest("button")) return;
      phase.tick();
    }
    function onRightClick(e) {
      let target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest("button")) return;
      e.preventDefault();
      phase.untick();
    }
    function setNo(no) {
      if (no < 0 || no >= get$1(drills).length) return;
      set(indx, no, true);
      set(drill, get$1(drills)[get$1(indx) % get$1(drills).length], true);
      phase.start(get$1(drill).id, get$1(drill).phases);
    }
    let next2 = () => setNo(get$1(indx) + 1);
    document.addEventListener("DOMContentLoaded", () => {
      let all = buildDrills();
      set(drills, orderDrills(all, order, shuffle()), true);
      setNo(0);
    });
    var fragment = root$9();
    event("click", $window, onclick2);
    event("contextmenu", $window, onRightClick);
    event("dblclick", $window, next2);
    var node = first_child(fragment);
    Logger(node, {});
    var div = sibling(node, 2);
    set_style(div, "", {}, {
      "--animation-time": "1s",
      "--line-no-font-size": "0.6em",
      "--right-color": "rgb(200, 255, 200);"
    });
    var node_1 = child(div);
    {
      var consequent = ($$anchor2) => {
        var fragment_1 = comment();
        var node_2 = first_child(fragment_1);
        key$1(node_2, () => get$1(refreshKey), ($$anchor3) => {
          var fragment_2 = comment();
          var node_3 = first_child(fragment_2);
          each(node_3, 17, () => get$1(drill).lines, index, ($$anchor4, line2) => {
            Line($$anchor4, {
              get phaseNo() {
                return get$1(line2).phaseNo;
              },
              get wrongLine() {
                return get$1(line2).wrongLine;
              },
              children: ($$anchor5, $$slotProps) => {
                var fragment_4 = comment();
                var node_4 = first_child(fragment_4);
                each(node_4, 17, () => get$1(line2).tokens, index, ($$anchor6, token2) => {
                  var fragment_5 = comment();
                  const C = /* @__PURE__ */ user_derived(() => components.get(get$1(token2).type));
                  var node_5 = first_child(fragment_5);
                  component(node_5, () => get$1(C), ($$anchor7, C_1) => {
                    C_1($$anchor7, spread_props(() => get$1(token2).props));
                  });
                  append($$anchor6, fragment_5);
                });
                append($$anchor5, fragment_4);
              },
              $$slots: { default: true }
            });
          });
          append($$anchor3, fragment_2);
        });
        append($$anchor2, fragment_1);
      };
      var alternate = ($$anchor2) => {
        var text$1 = text("Please wait while parsing drills...");
        append($$anchor2, text$1);
      };
      if_block(node_1, ($$render) => {
        if (get$1(drill)) $$render(consequent);
        else $$render(alternate, false);
      });
    }
    reset(div);
    var div_1 = sibling(div, 2);
    var button = child(div_1);
    button.__click = [shuffleDrills, shuffleCount, drills, setNo];
    var button_1 = sibling(button, 2);
    let classes;
    button_1.__click = [prev, setNo, indx];
    var button_2 = sibling(button_1, 2);
    let classes_1;
    button_2.__click = next2;
    var button_3 = sibling(button_2, 2);
    button_3.__click = [reveal];
    var button_4 = sibling(button_3, 2);
    button_4.__click = [again, drill];
    var node_6 = sibling(button_4, 2);
    {
      var consequent_1 = ($$anchor2) => {
        var br = root_7$2();
        append($$anchor2, br);
      };
      if_block(node_6, ($$render) => {
        if (get$1(drills).length > 15) $$render(consequent_1);
      });
    }
    var node_7 = sibling(node_6, 2);
    each(node_7, 17, () => get$1(drills), index, ($$anchor2, drill2, no, $$array) => {
      var div_2 = root_8();
      var button_5 = child(div_2);
      let classes_2;
      button_5.__click = () => setNo(no);
      button_5.textContent = no + 1;
      reset(div_2);
      template_effect(
        ($0) => {
          set_attribute(div_2, "data-tip", get$1(drill2).id);
          classes_2 = set_class(button_5, 1, "exact btn btn-xs btn-primary  svelte-ur0zc1", null, classes_2, $0);
        },
        [() => ({ "btn-outline": no !== get$1(indx) })]
      );
      append($$anchor2, div_2);
    });
    reset(div_1);
    template_effect(
      ($0, $1) => {
        classes = set_class(button_1, 1, "prev btn btn-xs btn-accent", null, classes, $0);
        classes_1 = set_class(button_2, 1, "next btn btn-xs btn-accent", null, classes_1, $1);
      },
      [
        () => ({ "btn-disabled": get$1(indx) === 0 }),
        () => ({ "btn-disabled": get$1(indx) === get$1(drills).length - 1 })
      ]
    );
    append($$anchor, fragment);
    return pop$1({
      get "log-level"() {
        return logLevel();
      },
      set "log-level"($$value) {
        logLevel($$value);
        flushSync();
      },
      get show() {
        return show();
      },
      set show($$value) {
        show($$value);
        flushSync();
      },
      get shuffle() {
        return shuffle();
      },
      set shuffle($$value) {
        shuffle($$value);
        flushSync();
      }
    });
  }
  delegate(["click"]);
  customElements.define("code-drills", create_custom_element(Code_drills, { "log-level": {}, show: {}, shuffle: {} }, [], [], false));
  function Import_hints($$anchor, $$props) {
    push$1($$props, true);
    let from = prop($$props, "from", 7);
    if (from()) {
      console.log(`Loading hints from '${from()}'`);
      hints.importHints(from());
    } else {
      console.warn(`Can't loading hints from '${from()}' (attribute 'from' is missing?)`);
    }
    return pop$1({
      get from() {
        return from();
      },
      set from($$value) {
        from($$value);
        flushSync();
      }
    });
  }
  customElements.define("import-hints", create_custom_element(Import_hints, { from: {} }, [], [], false));
  const preventDblClick = (me) => {
    me.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });
  };
  const numbersAndFactors = [
    [[0], [], []],
    [[1], [], []],
    [[2], [], []],
    [[3], [], []],
    [[4], [2, 2], [2]],
    [[5], [], []],
    [[6], [2, 3], [2, 3]],
    [[7], [], []],
    [[8], [2, 2, 2], [2, 4]],
    [[9], [3, 3], [3]],
    [[10], [2, 5], [2, 5]],
    [[11], [], []],
    [[12], [2, 2, 3], [2, 3, 4, 6]],
    [[13], [], []],
    [[14], [2, 7], [2, 7]],
    [[15], [3, 5], [3, 5]],
    [[16], [2, 2, 2, 2], [2, 4, 8]],
    [[17], [], []],
    [[18], [2, 3, 3], [2, 3, 6, 9]],
    [[19], [], []],
    [[20], [2, 2, 5], [2, 4, 5, 10]],
    [[21], [3, 7], [3, 7]],
    [[22], [2, 11], [2, 11]],
    [[23], [], []],
    [[24], [2, 2, 2, 3], [2, 3, 4, 6, 8, 12]],
    [[25], [5, 5], [5]],
    [[26], [2, 13], [2, 13]],
    [[27], [3, 3, 3], [3, 9]],
    [[28], [2, 2, 7], [2, 4, 7, 14]],
    [[29], [], []],
    [[30], [2, 3, 5], [2, 3, 5, 6, 10, 15]],
    [[31], [], []],
    [[32], [2, 2, 2, 2, 2], [2, 4, 8, 16]],
    [[33], [3, 11], [3, 11]],
    [[34], [2, 17], [2, 17]],
    [[35], [5, 7], [5, 7]],
    [[36], [2, 2, 3, 3], [2, 3, 4, 6, 9, 12, 18]],
    [[37], [], []],
    [[38], [2, 19], [2, 19]],
    [[39], [3, 13], [3, 13]],
    [[40], [2, 2, 2, 5], [2, 4, 5, 8, 10, 20]],
    [[41], [], []],
    [[42], [2, 3, 7], [2, 3, 6, 7, 14, 21]],
    [[43], [], []],
    [[44], [2, 2, 11], [2, 4, 11, 22]],
    [[45], [3, 3, 5], [3, 5, 9, 15]],
    [[46], [2, 23], [2, 23]],
    [[47], [], []],
    [[48], [2, 2, 2, 2, 3], [2, 3, 4, 6, 8, 12, 16, 24]],
    [[49], [7, 7], [7]],
    [[50], [2, 5, 5], [2, 5, 10, 25]],
    [[51], [3, 17], [3, 17]],
    [[52], [2, 2, 13], [2, 4, 13, 26]],
    [[53], [], []],
    [[54], [2, 3, 3, 3], [2, 3, 6, 9, 18, 27]],
    [[55], [5, 11], [5, 11]],
    [[56], [2, 2, 2, 7], [2, 4, 7, 8, 14, 28]],
    [[57], [3, 19], [3, 19]],
    [[58], [2, 29], [2, 29]],
    [[59], [], []],
    [[60], [2, 2, 3, 5], [2, 3, 4, 5, 6, 10, 12, 15, 20, 30]],
    [[61], [], []],
    [[62], [2, 31], [2, 31]],
    [[63], [3, 3, 7], [3, 7, 9, 21]],
    [[64], [2, 2, 2, 2, 2, 2], [2, 4, 8, 16, 32]],
    [[65], [5, 13], [5, 13]],
    [[66], [2, 3, 11], [2, 3, 6, 11, 22, 33]],
    [[67], [], []],
    [[68], [2, 2, 17], [2, 4, 17, 34]],
    [[69], [3, 23], [3, 23]],
    [[70], [2, 5, 7], [2, 5, 7, 10, 14, 35]],
    [[71], [], []],
    [[72], [2, 2, 2, 3, 3], [2, 3, 4, 6, 8, 9, 12, 18, 24, 36]],
    [[73], [], []],
    [[74], [2, 37], [2, 37]],
    [[75], [3, 5, 5], [3, 5, 15, 25]],
    [[76], [2, 2, 19], [2, 4, 19, 38]],
    [[77], [7, 11], [7, 11]],
    [[78], [2, 3, 13], [2, 3, 6, 13, 26, 39]],
    [[79], [], []],
    [[80], [2, 2, 2, 2, 5], [2, 4, 5, 8, 10, 16, 20, 40]],
    [[81], [3, 3, 3, 3], [3, 9, 27]],
    [[82], [2, 41], [2, 41]],
    [[83], [], []],
    [[84], [2, 2, 3, 7], [2, 3, 4, 6, 7, 12, 14, 21, 28, 42]],
    [[85], [5, 17], [5, 17]],
    [[86], [2, 43], [2, 43]],
    [[87], [3, 29], [3, 29]],
    [[88], [2, 2, 2, 11], [2, 4, 8, 11, 22, 44]],
    [[89], [], []],
    [[90], [2, 3, 3, 5], [2, 3, 5, 6, 9, 10, 15, 18, 30, 45]],
    [[91], [7, 13], [7, 13]],
    [[92], [2, 2, 23], [2, 4, 23, 46]],
    [[93], [3, 31], [3, 31]],
    [[94], [2, 47], [2, 47]],
    [[95], [5, 19], [5, 19]],
    [
      [96],
      [2, 2, 2, 2, 2, 3],
      [2, 3, 4, 6, 8, 12, 16, 24, 32, 48]
    ],
    [[97], [], []],
    [[98], [2, 7, 7], [2, 7, 14, 49]],
    [[99], [3, 3, 11], [3, 9, 11, 33]],
    [[100], [2, 2, 5, 5], [2, 4, 5, 10, 20, 25, 50]],
    [[101], [], []],
    [[102], [2, 3, 17], [2, 3, 6, 17, 34, 51]],
    [[103], [], []],
    [[104], [2, 2, 2, 13], [2, 4, 8, 13, 26, 52]],
    [[105], [3, 5, 7], [3, 5, 7, 15, 21, 35]],
    [[106], [2, 53], [2, 53]],
    [[107], [], []],
    [[108], [2, 2, 3, 3, 3], [2, 3, 4, 6, 9, 12, 18, 27, 36, 54]],
    [[109], [], []],
    [[110], [2, 5, 11], [2, 5, 10, 11, 22, 55]],
    [[111], [3, 37], [3, 37]],
    [[112], [2, 2, 2, 2, 7], [2, 4, 7, 8, 14, 16, 28, 56]],
    [[113], [], []],
    [[114], [2, 3, 19], [2, 3, 6, 19, 38, 57]],
    [[115], [5, 23], [5, 23]],
    [[116], [2, 2, 29], [2, 4, 29, 58]],
    [[117], [3, 3, 13], [3, 9, 13, 39]],
    [[118], [2, 59], [2, 59]],
    [[119], [7, 17], [7, 17]],
    [
      [120],
      [2, 2, 2, 3, 5],
      [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60]
    ],
    [[128], [2, 2, 2, 2, 2, 2, 2], [2, 4, 8, 16, 32, 64]],
    [[256], [2, 2, 2, 2, 2, 2, 2, 2], [2, 4, 8, 16, 32, 64, 128]],
    [
      [512],
      [2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 4, 8, 16, 32, 64, 128, 256]
    ],
    [[243], [3, 3, 3, 3, 3], [3, 9, 27, 81]],
    [[729], [3, 3, 3, 3, 3, 3], [3, 9, 27, 81, 243]],
    [[121], [11, 11], [11]],
    [
      [144],
      [2, 2, 2, 2, 3, 3],
      [2, 3, 4, 6, 8, 9, 12, 16, 18, 24, 36, 48, 72]
    ],
    [[169], [13, 13], [13]],
    [[196], [2, 2, 7, 7], [2, 4, 7, 14, 28, 49, 98]],
    [[225], [3, 3, 5, 5], [3, 5, 9, 15, 25, 45, 75]]
  ];
  function dataOf(num) {
    if (num > 0 && num <= 120) return numbersAndFactors[num];
    for (let i = 0; i < numbersAndFactors.length; i++) {
      let data = numbersAndFactors[i];
      if (data[0][0] === num) return data;
    }
    return void 0;
  }
  function primesOf(num) {
    let data = dataOf(num);
    return data ? data[1] : [1];
  }
  function factorsOf(num) {
    let data = dataOf(num);
    return data ? data[2] : [num];
  }
  const number = ($$anchor, value = noop) => {
    var span = root_1$6();
    const long = /* @__PURE__ */ user_derived(() => value() < 100 ? "" : "long");
    var span_1 = child(span);
    var text2 = child(span_1, true);
    reset(span_1);
    reset(span);
    template_effect(() => {
      set_class(span, 1, `number rounded-md text-red-600 ${get$1(long) ?? ""}`, "svelte-1qf91z5");
      set_text(text2, value());
    });
    append($$anchor, span);
  };
  const prime = ($$anchor, value = noop) => {
    var span_2 = root_2$3();
    var span_3 = child(span_2);
    var text_1 = child(span_3, true);
    reset(span_3);
    reset(span_2);
    template_effect(() => set_text(text_1, value()));
    append($$anchor, span_2);
  };
  const factor = ($$anchor, value = noop) => {
    var span_4 = root_3$1();
    const long = /* @__PURE__ */ user_derived(() => value().length < 3 ? "" : "long");
    const fontBold = /* @__PURE__ */ user_derived(() => value().length < 3 ? "font-bold" : "");
    var span_5 = child(span_4);
    var text_2 = child(span_5, true);
    reset(span_5);
    reset(span_4);
    template_effect(() => {
      set_class(span_4, 1, `factor rounded-md bg-purple-100 ${get$1(long) ?? ""}`, "svelte-1qf91z5");
      set_class(span_5, 1, get$1(fontBold), "svelte-1qf91z5");
      set_text(text_2, value());
    });
    append($$anchor, span_4);
  };
  const listOfPrimes = ($$anchor, primes = noop) => {
    var div_1 = root_5();
    each(div_1, 21, primes, index, ($$anchor2, value) => {
      prime($$anchor2, () => get$1(value));
    });
    reset(div_1);
    append($$anchor, div_1);
  };
  const listOfFactors = ($$anchor, factors = noop) => {
    var div_2 = root_7$1();
    each(div_2, 21, factors, index, ($$anchor2, value) => {
      factor($$anchor2, () => get$1(value));
    });
    reset(div_2);
    append($$anchor, div_2);
  };
  var root_1$6 = /* @__PURE__ */ from_html(`<span><span class="font-bold"> </span></span>`);
  var root_2$3 = /* @__PURE__ */ from_html(`<span class="prime rounded-md bg-yellow-100 text-green-800 svelte-1qf91z5"><span class="font-bold"> </span></span>`);
  var root_3$1 = /* @__PURE__ */ from_html(`<span><span> </span></span>`);
  var on_click = (_, flip, num) => flip(num());
  var root_4 = /* @__PURE__ */ from_html(`<div class="card shadow-xl rounded-md bg-yellow-50 hover:bg-yellow-100 svelte-1qf91z5"><!> <!> <!></div>`);
  var root_5 = /* @__PURE__ */ from_html(`<div class="list-of-primes rounded-md svelte-1qf91z5"></div>`);
  var root_7$1 = /* @__PURE__ */ from_html(`<div class="list-of-factors rounded-md bg-purple-50 svelte-1qf91z5"></div>`);
  var root_9 = /* @__PURE__ */ from_html(`<div class="grid-of-numbers svelte-1qf91z5"></div>`);
  var root$8 = /* @__PURE__ */ from_html(`<!> <div><!></div>`, 1);
  const $$css$8 = {
    hash: "svelte-1qf91z5",
    code: '.number.svelte-1qf91z5 {grid-area:a;display:grid;place-items:center;font-size:48px;}.number.long.svelte-1qf91z5 {font-size:40px;}.prime.svelte-1qf91z5 {display:grid;place-items:center;font-size:28px;}.factor.svelte-1qf91z5 {display:grid;place-items:center;font-size:24px;}.factor.long.svelte-1qf91z5 {font-size:18px;}.card.svelte-1qf91z5 {width:200px;height:250px;display:grid;grid-template-columns:repeat(5, 1fr);grid-template-rows:repeat(4, 1fr);gap:8px;grid-template-areas:"a a b b b"\r\n            "a a b b b"\r\n            "c c c c c"\r\n            "c c c c c";outline:1px solid black;transition:outline 0.1s;}.card.svelte-1qf91z5:hover {outline:3px solid blue;}.list-of-primes.svelte-1qf91z5 {grid-area:b;display:grid;grid-template-columns:repeat(auto-fill, 32px);gap:4px;justify-content:space-evenly;align-content:space-evenly;}.list-of-factors.svelte-1qf91z5 {grid-area:c;display:grid;grid-template-columns:repeat(auto-fill, 28px);gap:8px;justify-content:space-evenly;align-content:space-evenly;}.grid-of-numbers.svelte-1qf91z5 {display:grid;grid-template-columns:repeat(auto-fill, 200px);gap:16px;justify-content:space-evenly;}'
  };
  function Va_numbers($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$8);
    const card = ($$anchor2, num = noop) => {
      var div = root_4();
      div.__click = [on_click, flip, num];
      var node = child(div);
      number(node, num);
      var node_1 = sibling(node, 2);
      {
        let $0 = /* @__PURE__ */ user_derived(() => getPrimes(num()));
        listOfPrimes(node_1, () => get$1($0));
      }
      var node_2 = sibling(node_1, 2);
      {
        let $0 = /* @__PURE__ */ user_derived(() => getFactors(num()));
        listOfFactors(node_2, () => get$1($0));
      }
      reset(div);
      append($$anchor2, div);
    };
    const gridOfNumbers = ($$anchor2, numbers2 = noop) => {
      var div_3 = root_9();
      each(div_3, 21, numbers2, index, ($$anchor3, num) => {
        card($$anchor3, () => get$1(num));
      });
      reset(div_3);
      append($$anchor2, div_3);
    };
    let list = prop($$props, "list", 7), asis = prop($$props, "asis", 7), take = prop($$props, "take", 7);
    let values = lib.parse(list());
    if (take()) {
      take(Number(take()));
      if (!Number.isNaN(take())) {
        values = lodashExports.sampleSize(values, take());
      }
    }
    let numbers = asis() !== void 0 ? values : lodashExports.shuffle(values);
    let flipped = /* @__PURE__ */ state$1(proxy({}));
    function flip(num) {
      get$1(flipped)[num] = !get$1(flipped)[num];
    }
    function getPrimes(num) {
      if (!get$1(flipped)[num]) {
        return ["?"];
      }
      let primes = lodashExports.shuffle(primesOf(num));
      return primes.length === 0 ? ["😁"] : primes.map((num2) => num2.toString());
    }
    function getFactors(num) {
      if (!get$1(flipped)[num]) {
        return ["?"];
      }
      let factors = lodashExports.shuffle(factorsOf(num));
      return factors.length === 0 ? ["p", "r", "i", "m", "e"] : factors.map((num2) => num2.toString());
    }
    var fragment_3 = root$8();
    var node_3 = first_child(fragment_3);
    WithTailwind(node_3, {});
    var div_4 = sibling(node_3, 2);
    var node_4 = child(div_4);
    gridOfNumbers(node_4, () => numbers);
    reset(div_4);
    attach(div_4, () => preventDblClick);
    append($$anchor, fragment_3);
    return pop$1({
      get list() {
        return list();
      },
      set list($$value) {
        list($$value);
        flushSync();
      },
      get asis() {
        return asis();
      },
      set asis($$value) {
        asis($$value);
        flushSync();
      },
      get take() {
        return take();
      },
      set take($$value) {
        take($$value);
        flushSync();
      }
    });
  }
  delegate(["click"]);
  customElements.define("va-numbers", create_custom_element(Va_numbers, { list: {}, asis: {}, take: {} }, [], [], false));
  var root$7 = /* @__PURE__ */ from_html(`<div></div>`);
  function WithAnki($$anchor, $$props) {
    push$1($$props, true);
    let self2;
    user_effect(() => addToMyRoot(self2, ["tailwind", "daisy-ui"]));
    var div = root$7();
    bind_this(div, ($$value) => self2 = $$value, () => self2);
    append($$anchor, div);
    pop$1();
  }
  create_custom_element(WithAnki, {}, [], [], true);
  async function clicked(_, copyOnClick, tooltip) {
    if (!copyOnClick()) return;
    await navigator.clipboard.writeText(tooltip());
  }
  var root$6 = /* @__PURE__ */ from_html(`<div class="tooltip svelte-12fwu4a"> </div>`);
  const $$css$7 = {
    hash: "svelte-12fwu4a",
    code: ".tooltip.svelte-12fwu4a {position:absolute;top:0;left:0;right:0;height:18px;background:transparent;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;font-size:14px;font-style:italic;z-index:1;color:transparent;transition:color 0.2s;}.tooltip.svelte-12fwu4a:hover {color:grey;}"
  };
  function TopHoverTooltip($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$7);
    let tooltip = prop($$props, "tooltip", 7), copyOnClick = prop($$props, "copyOnClick", 7, true);
    var div = root$6();
    div.__click = [clicked, copyOnClick, tooltip];
    var text2 = child(div, true);
    reset(div);
    template_effect(() => set_text(text2, tooltip()));
    append($$anchor, div);
    return pop$1({
      get tooltip() {
        return tooltip();
      },
      set tooltip($$value) {
        tooltip($$value);
        flushSync();
      },
      get copyOnClick() {
        return copyOnClick();
      },
      set copyOnClick($$value = true) {
        copyOnClick($$value);
        flushSync();
      }
    });
  }
  delegate(["click"]);
  create_custom_element(TopHoverTooltip, { tooltip: {}, copyOnClick: {} }, [], [], true);
  const ankiCounters = (() => {
    let _db = /* @__PURE__ */ new Map();
    let _shown = /* @__PURE__ */ new Set();
    function makeCounters() {
      return {
        complete: writable(0),
        current: { right: writable(0), wrong: writable(0) },
        total: { right: writable(0), wrong: writable(0) }
      };
    }
    function getOrCreateCounters(id) {
      let counters = _db.get(id);
      if (!counters) {
        counters = makeCounters();
        _db.set(id, counters);
      }
      return counters;
    }
    function setAnkiCounters(msg) {
      let counters = ankiCounters.getOrCreateCounters(msg.cardId);
      counters.complete.set(msg.complete);
      counters.current.right.set(msg.current.right);
      counters.current.wrong.set(msg.current.wrong);
      counters.total.right.set(msg.total.right);
      counters.total.wrong.set(msg.total.wrong);
    }
    function answerIsHere(msg) {
      if (!msg._ankiCardId) return;
      let sessionId = myPage2.sessionId;
      backend.post(`/anki-card/${msg._ankiCardId}/${sessionId}/${msg.type}`);
      if (msg.type === "right-answer") {
        myPage2.rightsToday.update((cnt) => cnt + 1);
      }
    }
    function show(id) {
      if (_shown.has(id)) return;
      let sessionId = myPage2.sessionId;
      backend.post(`/anki-card/${id}/${sessionId}/show`);
      _shown.add(id);
    }
    window.addEventListener("message", (e) => answerIsHere(e.data));
    sse.addListener("anki-counters", setAnkiCounters);
    return { getOrCreateCounters, answerIsHere, show };
  })();
  const current = ($$anchor, right = noop, wrong = noop) => {
    var fragment = root_1$5();
    var span = first_child(fragment);
    var text2 = child(span, true);
    reset(span);
    var span_1 = sibling(span, 2);
    var text_1 = child(span_1, true);
    reset(span_1);
    template_effect(() => {
      set_text(text2, right());
      set_text(text_1, wrong());
    });
    append($$anchor, fragment);
  };
  const total = ($$anchor, right = noop, wrong = noop) => {
    var fragment_1 = root_2$2();
    var span_2 = sibling(first_child(fragment_1), 2);
    var text_2 = child(span_2, true);
    reset(span_2);
    var span_3 = sibling(span_2, 2);
    var text_3 = child(span_3, true);
    reset(span_3);
    template_effect(() => {
      set_text(text_2, right());
      set_text(text_3, wrong());
    });
    append($$anchor, fragment_1);
  };
  var root_1$5 = /* @__PURE__ */ from_html(`<span class="cur text-green-800 svelte-mxsou7"> </span> / <span class="cur text-red-800 svelte-mxsou7"> </span>`, 1);
  var root_2$2 = /* @__PURE__ */ from_html(`<span id="total" class="svelte-mxsou7">total</span> <span class="text-green-800"> </span> / <span class="text-red-800"> </span>`, 1);
  var root_3 = /* @__PURE__ */ from_html(`<a id="video" class="svelte-mxsou7">🎦</a>`);
  var root$5 = /* @__PURE__ */ from_html(`<div class="stat svelte-mxsou7"><div><!></div> <div><!></div> <span> </span> <!> <button>🔄️</button></div>`);
  const $$css$6 = {
    hash: "svelte-mxsou7",
    code: "#total.svelte-mxsou7 {font-size:12px;}.cur.svelte-mxsou7 {font-size:18px;}.stat.svelte-mxsou7 {width:var(--width);display:flex;justify-content:space-evenly;}#video.svelte-mxsou7 {font-size:18px;}"
  };
  function AnkiStat($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$6);
    const [$$stores, $$cleanup] = setup_stores();
    const $cRight = () => store_get(cRight, "$cRight", $$stores);
    const $cWrong = () => store_get(cWrong, "$cWrong", $$stores);
    const $tRight = () => store_get(tRight, "$tRight", $$stores);
    const $tWrong = () => store_get(tWrong, "$tWrong", $$stores);
    const $complete = () => store_get(complete, "$complete", $$stores);
    let id = prop($$props, "id", 7), width = prop($$props, "width", 7), refreshIsClicked = prop($$props, "refreshIsClicked", 7), video = prop($$props, "video", 7);
    let counters = ankiCounters.getOrCreateCounters(id());
    let { complete, tRight, tWrong, cRight, cWrong } = {
      complete: counters.complete,
      cRight: counters.current.right,
      cWrong: counters.current.wrong,
      tRight: counters.total.right,
      tWrong: counters.total.wrong
    };
    onMount(() => {
      ankiCounters.show(id());
    });
    var div = root$5();
    var div_1 = child(div);
    var node = child(div_1);
    current(node, $cRight, $cWrong);
    reset(div_1);
    var div_2 = sibling(div_1, 2);
    var node_1 = child(div_2);
    total(node_1, $tRight, $tWrong);
    reset(div_2);
    var span_4 = sibling(div_2, 2);
    var text_4 = child(span_4, true);
    reset(span_4);
    var node_2 = sibling(span_4, 2);
    {
      var consequent = ($$anchor2) => {
        var a = root_3();
        template_effect(() => set_attribute(a, "href", video()));
        append($$anchor2, a);
      };
      if_block(node_2, ($$render) => {
        if (video()) $$render(consequent);
      });
    }
    var button = sibling(node_2, 2);
    button.__click = function(...$$args) {
      refreshIsClicked()?.apply(this, $$args);
    };
    reset(div);
    template_effect(() => {
      set_style(div, `--width: ${width() ?? ""};`);
      set_text(text_4, $complete());
    });
    append($$anchor, div);
    var $$pop = pop$1({
      get id() {
        return id();
      },
      set id($$value) {
        id($$value);
        flushSync();
      },
      get width() {
        return width();
      },
      set width($$value) {
        width($$value);
        flushSync();
      },
      get refreshIsClicked() {
        return refreshIsClicked();
      },
      set refreshIsClicked($$value) {
        refreshIsClicked($$value);
        flushSync();
      },
      get video() {
        return video();
      },
      set video($$value) {
        video($$value);
        flushSync();
      }
    });
    $$cleanup();
    return $$pop;
  }
  delegate(["click"]);
  create_custom_element(AnkiStat, { id: {}, width: {}, refreshIsClicked: {}, video: {} }, [], [], true);
  function clickToStart(_, active, cardId) {
    set(active, false);
    let sessionId = myPage2.sessionId;
    backend.post(`/anki-card/${cardId()}/${sessionId}/start`);
    console.log(`POST /anki-card/${cardId()}/${sessionId}/start`);
  }
  var root_1$4 = /* @__PURE__ */ from_html(`<div class="click-to-start svelte-knci59"><svg viewBox="0 0 64 64" aria-hidden="true" class="svelte-knci59"><defs><radialGradient id="g" cx="30%" cy="30%"><stop offset="0%" stop-color="#ffffff"></stop><stop offset="100%" stop-color="#e6e6e6"></stop></radialGradient></defs><circle cx="32" cy="32" r="30" fill="url(#g)"></circle><circle cx="32" cy="32" r="30" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="2"></circle><polygon points="28,20 28,44 44,32" fill="#111"></polygon></svg></div> <!>`, 1);
  const $$css$5 = {
    hash: "svelte-knci59",
    code: ".click-to-start.svelte-knci59 {position:absolute;inset:0;background:rgba(0,0,0,0.35);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;border-radius:16px;cursor:pointer;z-index:10;transition:backdrop-filter 0.2s ease;}.click-to-start.svelte-knci59:hover {backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);}.click-to-start.svelte-knci59 svg:where(.svelte-knci59) {width:96px;height:96px;transition:transform 0.2s ease;}.click-to-start.svelte-knci59:hover svg:where(.svelte-knci59) {transform:scale(1.06);}"
  };
  function ClickToStart($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$5);
    let cardId = prop($$props, "cardId", 7), children = prop($$props, "children", 7);
    let active = /* @__PURE__ */ state$1(true);
    var fragment = comment();
    var node = first_child(fragment);
    {
      var consequent = ($$anchor2) => {
        var fragment_1 = root_1$4();
        var div = first_child(fragment_1);
        div.__click = [clickToStart, active, cardId];
        var node_1 = sibling(div, 2);
        snippet(node_1, children);
        append($$anchor2, fragment_1);
      };
      var alternate = ($$anchor2) => {
        var fragment_2 = comment();
        var node_2 = first_child(fragment_2);
        snippet(node_2, children);
        append($$anchor2, fragment_2);
      };
      if_block(node, ($$render) => {
        if (get$1(active)) $$render(consequent);
        else $$render(alternate, false);
      });
    }
    append($$anchor, fragment);
    return pop$1({
      get cardId() {
        return cardId();
      },
      set cardId($$value) {
        cardId($$value);
        flushSync();
      },
      get children() {
        return children();
      },
      set children($$value) {
        children($$value);
        flushSync();
      }
    });
  }
  delegate(["click"]);
  create_custom_element(ClickToStart, { cardId: {}, children: {} }, [], [], true);
  const ankiDetails = /* @__PURE__ */ (() => {
    let db = {
      "iq-math-memutza_1-16": ["https://youtu.be/_CbVkrx2LsA", ["l3"]],
      "iq-math-memutza_1-15": ["https://youtu.be/OjaSQfAGZJA", ["l3,bad-mic"]],
      "iq-math-melulit_all_1-01": ["https://youtu.be/0n1SsFWoy0I", ["l3,bad-mic"]],
      "iq-math-melulit_all_1-01-2": ["https://youtu.be/3nBHZ3wLUmU", ["l3,bad-mic"]],
      "iq-math-melulit_all_1-04-2": ["https://youtu.be/3sS-swkqgIM", ["l3,bad-mic"]],
      "iq-math-melulit_all_1-06": ["https://youtu.be/f0l3GM0oQK0", ["l3,bad-mic"]],
      "iq-math-dereh-espek-yahas_3-01": ["https://youtu.be/RmpXfjsrB14", ["l3,bad-mic"]],
      "iq-math-dereh-espek-yahas_4-02": ["https://youtu.be/nFbUhcikNiI", ["l3,bad-mic"]],
      "iq-math-dereh-espek-yahas_3-04": ["https://youtu.be/OvXxLRPeiYQ", ["l3,bad-mic"]],
      "iq-math-dereh-espek-yahas_4-07": ["https://youtu.be/dgLG6Xg65g4", ["l3,bad-mic"]],
      "iq-math-dereh-espek-yahas_4-05": ["https://youtu.be/eVS8ehXtArc", ["l3,bad-mic"]],
      "iq-math-dereh-espek-yahas_4-06": ["https://youtu.be/6jnMfWf-ODA", ["l3,bad-mic"]],
      "iq-baayot_shonot_1-08": ["https://youtu.be/wuLCnmUM0bQ", ["l3,bad-mic"]],
      "iq-baayot_shonot_1-16": ["https://youtu.be/CCHOL3jTRfI", ["l3,bad-mic"]],
      "iq-simulation-3-01": ["https://youtu.be/zq3WfHYNm0g", ["l3,bad-mic"]],
      "iq-simulation-3-07-2": ["https://youtu.be/nkhoEEswgLw", ["l3,bad-mic"]],
      "iq-math-shvarim_2-07": ["https://youtu.be/IJQvWeCKEkA", ["l3,bad-mic"]],
      "iq-math-shvarim_3-17": ["https://youtu.be/mIIPf_8xhD0", ["l3,bad-mic"]],
      "iq-math-shvarim_2-11": ["https://youtu.be/B2WMtbXEsY8", ["l3,bad-mic"]],
      "iq-math-ahuzim_4-03": ["https://youtu.be/JLUHfqAeIBQ", ["l3,bad-mic"]],
      "iq-math-ahuzim_4-01": ["https://youtu.be/vE8_QQM--ho", ["l3,bad-mic"]],
      "iq-math-ahuzim_4-04": ["https://youtu.be/X59lfwJg_YI", ["l3,bad-mic"]],
      "iq-math-ahuzim_4-07": ["https://youtu.be/9wcrV14vjmA", ["l3,bad-mic"]],
      "iq-math-ahuzim_2-13": ["https://youtu.be/QkDsSv0Y-5Y", ["l3,bad-mic"]],
      "iq-math-ahuzim_4-05": ["https://youtu.be/QOEjfSECbro", ["l3,bad-mic"]],
      "iq-math-melulit_all_1-02-2": ["https://youtu.be/QcZbhNvqIZs", ["l3"]],
      "iq-math-shvarim_1-15": ["https://youtu.be/mIIPf_8xhD0", ["l3"]],
      "iq-math-memutza_1-05": ["https://youtu.be/gBy0TdNNpn8", ["l3"]],
      "iq-math-dereh-espek-yahas_2-8": ["https://youtu.be/mTEP7VhNKCI", ["l3"]],
      "iq-math-melulit_all_1-10": ["https://youtu.be/Puj7eDker0g", ["l3"]],
      "ym-logic-alice-01": ["https://youtu.be/jfWCRXAZTao", ["l3 logic"]],
      "ym-logic-alice-02": ["https://youtu.be/ShB7-FjbGLU", ["l3 logic"]],
      "ym-logic-alice-03": ["https://youtu.be/RRiOfkoHhP4", ["l3 logic"]],
      "ym-logic-alice-04": ["https://youtu.be/vDr2MrQkr0c", ["l3 logic"]],
      "ym-logic-alice-05": ["https://youtu.be/6qoqWS8iv-A", ["l3 logic"]],
      "ym-logic-alice-06": ["https://youtu.be/T9wp4piemKA", ["l3 logic"]],
      "ym-logic-alice-07": ["https://youtu.be/D64grO-fwT8", ["l3 logic"]],
      "ym-logic-alice-08": ["https://youtu.be/CNc_zG_xgCw", ["l3 logic"]],
      "ym-logic-alice-09": ["https://youtu.be/jy4juCQ3htw", ["l3 logic"]],
      "ym-logic-alice-10": ["https://youtu.be/gWOw2QGchWI", ["l3 logic"]],
      "ym-logic-alice-11": ["https://youtu.be/khPL_DbUUdw", ["l3 logic"]],
      "ym-logic-alice-12": ["https://youtu.be/4Y9hl8chwV0", ["l3 logic"]],
      "ym-logic-alice-13": ["https://youtu.be/B4ioB001LnU", ["l3 logic"]],
      "ym-logic-alice-14": ["https://youtu.be/vUcvYIYvWhI", ["l3 logic"]],
      "ym-logic-alice-15": ["https://youtu.be/oMrFb_k0a5k", ["l3 logic"]],
      "ym-logic-alice-16": ["https://youtu.be/FFuoo5L-woc", ["l3 logic"]],
      "ym-logic-cases-01": ["https://youtu.be/X9tlf2Wf8W0", ["l3 logic"]],
      "ym-logic-cases-02": ["https://youtu.be/gonqyvxc9IY", ["l3 logic"]],
      "ym-logic-cases-03": ["https://youtu.be/1zo-BGzZrWQ", ["l3 logic"]],
      "ym-logic-cases-04": ["https://youtu.be/BifyVNsaVOU", ["l3 logic"]],
      "ym-logic-cases-05": ["https://youtu.be/1So3d5WL5Js", ["l3 logic"]],
      "ym-logic-cases-06": ["https://youtu.be/07CMneWt7co", ["l3 logic"]],
      "ym-at-least-at-most-01": ["https://youtu.be/MNHnfH1ApPo", ["l3 logic"]],
      "ym-at-least-at-most-02": ["https://youtu.be/zhP047lprbg", ["l3 logic"]],
      "ym-logic-2-01": ["https://youtu.be/4fpHM87Ua0g", ["l3 logic"]],
      "ym-logic-2-02": ["https://youtu.be/UHDj_-xCDrs", ["l3 logic"]],
      "ym-logic-2-03": ["https://youtu.be/mUHhfSCoPUo", ["l3 logic"]],
      "ym-logic-2-04": ["https://youtu.be/WiHGnhLmCrg", ["l3 logic"]],
      "ym-logic-2-05": ["https://youtu.be/tIe_YsfQAcw", ["l3 logic"]],
      "ym-logic-2-06": ["https://youtu.be/jqdnSZfm6Kw", ["l3 logic"]],
      "ym-logic-2-07": ["https://youtu.be/XYXQkDgk_Fc", ["l3 logic"]],
      "ym-logic-2-08": ["https://youtu.be/fEchBkucqeA", ["l3 logic"]],
      "ym-logic-2-09": ["https://youtu.be/NhZq3_y56OM", ["l3 logic"]],
      "ym-logic-2-10": ["https://youtu.be/IDydVGq6T58", ["l3 logic"]],
      "ym-logic-2-11": ["https://youtu.be/RB7ZOtkXSMU", ["l3 logic"]],
      "ym-logic-2-12": ["https://youtu.be/9qapSd-0uG0", ["l3 logic"]],
      "ym-logic-2-13": ["https://youtu.be/JfytJpP2wzk", ["l3 logic"]],
      "ym-logic-2-14": ["https://youtu.be/pBewg0oUpgA", ["l3 logic"]],
      "ym-logic-2-15": ["https://youtu.be/6rifUN4qn7Q", ["l3 logic"]],
      "ym-logic-2-16": ["https://youtu.be/vN0PH4JETbo", ["l3 logic"]],
      "": ["", ["l3 logic"]]
    };
    function get2(id) {
      if (!Object.hasOwn(db, id)) return void 0;
      let info = db[id];
      return { video: info[0], tags: info[1] };
    }
    return { get: get2 };
  })();
  var root_2$1 = /* @__PURE__ */ from_html(`<iframe class="svelte-ema97h"></iframe>`);
  var root_1$3 = /* @__PURE__ */ from_html(`<div class="outer svelte-ema97h"><!> <div class="card shadow-xl rounded-lg svelte-ema97h"><!> <!></div></div>`);
  const $$css$4 = {
    hash: "svelte-ema97h",
    code: ".outer.svelte-ema97h {width:var(--width);}.card.svelte-ema97h {width:var(--width);height:var(--height);overflow:visible;display:inline-block;position:relative;outline:1px solid black;transition:outline 0.1s;z-index:0;}.card.svelte-ema97h:hover {outline:3px solid blue;}iframe.svelte-ema97h {transform:scale(var(--scale));transform-origin:0 0;}"
  };
  function AnkiCard($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$4);
    const my_iframe = ($$anchor2) => {
      var iframe_1 = root_2$1();
      bind_this(iframe_1, ($$value) => iframe = $$value, () => iframe);
      template_effect(() => {
        set_attribute(iframe_1, "title", id());
        set_attribute(iframe_1, "src", get$1(src));
        set_attribute(iframe_1, "width", iwidth);
        set_attribute(iframe_1, "height", iheight);
      });
      append($$anchor2, iframe_1);
    };
    let id = prop($$props, "id", 7), path = prop($$props, "path", 7), width = prop($$props, "width", 7), height = prop($$props, "height", 7), port = prop($$props, "port", 7), scale = prop($$props, "scale", 7), clickToStart2 = prop($$props, "clickToStart", 7);
    let refreshId = /* @__PURE__ */ state$1(0);
    let video = ankiDetails.get(id())?.video;
    let iframe;
    scale(scale() * (width() / 220));
    let iwidth = Math.trunc(width() / scale());
    let iheight = Math.trunc(height() / scale());
    let base = myCodespace.applyForwarding(`http://localhost:${port()}`);
    let root2 = path().startsWith("/") ? "" : "/";
    let src = /* @__PURE__ */ user_derived(() => `${base}${root2}${path()}.html?id=${encodeURIComponent(id())}&refreshId=${get$1(refreshId)}`);
    user_effect(() => {
      console.log(`IFRAME: src=${get$1(src)}`);
    });
    function refreshIsClicked() {
      set(refreshId, get$1(refreshId) + 1);
    }
    var div = root_1$3();
    var node = child(div);
    AnkiStat(node, {
      get id() {
        return id();
      },
      get width() {
        return iwidth;
      },
      refreshIsClicked,
      get video() {
        return video;
      }
    });
    var div_1 = sibling(node, 2);
    var node_1 = child(div_1);
    TopHoverTooltip(node_1, {
      get tooltip() {
        return id();
      }
    });
    var node_2 = sibling(node_1, 2);
    {
      var consequent = ($$anchor2) => {
        ClickToStart($$anchor2, {
          get cardId() {
            return id();
          },
          children: ($$anchor3, $$slotProps) => {
            my_iframe($$anchor3);
          },
          $$slots: { default: true }
        });
      };
      var alternate = ($$anchor2) => {
        my_iframe($$anchor2);
      };
      if_block(node_2, ($$render) => {
        if (clickToStart2()) $$render(consequent);
        else $$render(alternate, false);
      });
    }
    reset(div_1);
    reset(div);
    template_effect(() => set_style(div, `
        --width: ${width() ?? ""}px; 
        --height: ${height() ?? ""}px; 
        --scale: ${scale() ?? ""};
    `));
    append($$anchor, div);
    return pop$1({
      get id() {
        return id();
      },
      set id($$value) {
        id($$value);
        flushSync();
      },
      get path() {
        return path();
      },
      set path($$value) {
        path($$value);
        flushSync();
      },
      get width() {
        return width();
      },
      set width($$value) {
        width($$value);
        flushSync();
      },
      get height() {
        return height();
      },
      set height($$value) {
        height($$value);
        flushSync();
      },
      get port() {
        return port();
      },
      set port($$value) {
        port($$value);
        flushSync();
      },
      get scale() {
        return scale();
      },
      set scale($$value) {
        scale($$value);
        flushSync();
      },
      get clickToStart() {
        return clickToStart2();
      },
      set clickToStart($$value) {
        clickToStart2($$value);
        flushSync();
      }
    });
  }
  create_custom_element(
    AnkiCard,
    {
      id: {},
      path: {},
      width: {},
      height: {},
      port: {},
      scale: {},
      clickToStart: {}
    },
    [],
    [],
    true
  );
  var root$4 = /* @__PURE__ */ from_html(`<!> <div><!></div>`, 1);
  function Anki_card($$anchor, $$props) {
    let args = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "$$host"]);
    let {
      id,
      path = "",
      width = 300,
      height = 0,
      port = 5174,
      scale = 1
    } = args;
    let clickToStart2 = "click-to-start" in args;
    if (height === 0) height = Math.trunc(width * (3 / 2));
    path = `gifted-vav/.anki-cards/${path}/${id}`;
    var fragment = root$4();
    var node = first_child(fragment);
    WithAnki(node, {});
    var div = sibling(node, 2);
    var node_1 = child(div);
    AnkiCard(node_1, {
      get id() {
        return id;
      },
      get path() {
        return path;
      },
      get width() {
        return width;
      },
      get height() {
        return height;
      },
      get port() {
        return port;
      },
      get scale() {
        return scale;
      },
      get clickToStart() {
        return clickToStart2;
      }
    });
    reset(div);
    attach(div, () => preventDblClick);
    append($$anchor, fragment);
  }
  customElements.define("anki-card", create_custom_element(Anki_card, {}, [], [], false));
  var root$3 = /* @__PURE__ */ from_html(`<span> <span class="loading loading-ring loading-md"></span></span>`);
  function Spin($$anchor, $$props) {
    push$1($$props, true);
    let msg = prop($$props, "msg", 7);
    var span = root$3();
    var text2 = child(span);
    next();
    reset(span);
    template_effect(() => set_text(text2, `${msg() ?? ""} `));
    append($$anchor, span);
    return pop$1({
      get msg() {
        return msg();
      },
      set msg($$value) {
        msg($$value);
        flushSync();
      }
    });
  }
  create_custom_element(Spin, { msg: {} }, [], [], true);
  var root_1$2 = /* @__PURE__ */ from_html(`<div></div>`);
  function ClearFallbackHtml($$anchor) {
    function hideFallbackElement(me) {
      let root2 = me.getRootNode();
      let fallback = root2.querySelector(".b-fallback");
      if (!fallback) return;
      fallback.style.display = "none";
    }
    var div = root_1$2();
    attach(div, () => hideFallbackElement);
    append($$anchor, div);
  }
  create_custom_element(ClearFallbackHtml, {}, [], [], true);
  const objectToString = Object.prototype.toString;
  const isError = (value) => objectToString.call(value) === "[object Error]";
  const errorMessages = /* @__PURE__ */ new Set([
    "network error",
    // Chrome
    "Failed to fetch",
    // Chrome
    "NetworkError when attempting to fetch resource.",
    // Firefox
    "The Internet connection appears to be offline.",
    // Safari 16
    "Network request failed",
    // `cross-fetch`
    "fetch failed",
    // Undici (Node.js)
    "terminated",
    // Undici (Node.js)
    " A network error occurred.",
    // Bun (WebKit)
    "Network connection lost"
    // Cloudflare Workers (fetch)
  ]);
  function isNetworkError(error) {
    const isValid = error && isError(error) && error.name === "TypeError" && typeof error.message === "string";
    if (!isValid) {
      return false;
    }
    const { message, stack: stack2 } = error;
    if (message === "Load failed") {
      return stack2 === void 0 || "__sentry_captured__" in error;
    }
    if (message.startsWith("error sending request for url")) {
      return true;
    }
    return errorMessages.has(message);
  }
  function validateRetries(retries) {
    if (typeof retries === "number") {
      if (retries < 0) {
        throw new TypeError("Expected `retries` to be a non-negative number.");
      }
      if (Number.isNaN(retries)) {
        throw new TypeError("Expected `retries` to be a valid number or Infinity, got NaN.");
      }
    } else if (retries !== void 0) {
      throw new TypeError("Expected `retries` to be a number or Infinity.");
    }
  }
  function validateNumberOption(name, value, { min = 0, allowInfinity = false } = {}) {
    if (value === void 0) {
      return;
    }
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new TypeError(`Expected \`${name}\` to be a number${allowInfinity ? " or Infinity" : ""}.`);
    }
    if (!allowInfinity && !Number.isFinite(value)) {
      throw new TypeError(`Expected \`${name}\` to be a finite number.`);
    }
    if (value < min) {
      throw new TypeError(`Expected \`${name}\` to be ≥ ${min}.`);
    }
  }
  class AbortError extends Error {
    constructor(message) {
      super();
      if (message instanceof Error) {
        this.originalError = message;
        ({ message } = message);
      } else {
        this.originalError = new Error(message);
        this.originalError.stack = this.stack;
      }
      this.name = "AbortError";
      this.message = message;
    }
  }
  function calculateDelay(retriesConsumed, options) {
    const attempt = Math.max(1, retriesConsumed + 1);
    const random = options.randomize ? Math.random() + 1 : 1;
    let timeout = Math.round(random * options.minTimeout * options.factor ** (attempt - 1));
    timeout = Math.min(timeout, options.maxTimeout);
    return timeout;
  }
  function calculateRemainingTime(start, max) {
    if (!Number.isFinite(max)) {
      return max;
    }
    return max - (performance.now() - start);
  }
  async function onAttemptFailure({ error, attemptNumber, retriesConsumed, startTime, options }) {
    const normalizedError = error instanceof Error ? error : new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`);
    if (normalizedError instanceof AbortError) {
      throw normalizedError.originalError;
    }
    const retriesLeft = Number.isFinite(options.retries) ? Math.max(0, options.retries - retriesConsumed) : options.retries;
    const maxRetryTime = options.maxRetryTime ?? Number.POSITIVE_INFINITY;
    const context = Object.freeze({
      error: normalizedError,
      attemptNumber,
      retriesLeft,
      retriesConsumed
    });
    await options.onFailedAttempt(context);
    if (calculateRemainingTime(startTime, maxRetryTime) <= 0) {
      throw normalizedError;
    }
    const consumeRetry = await options.shouldConsumeRetry(context);
    const remainingTime = calculateRemainingTime(startTime, maxRetryTime);
    if (remainingTime <= 0 || retriesLeft <= 0) {
      throw normalizedError;
    }
    if (normalizedError instanceof TypeError && !isNetworkError(normalizedError)) {
      if (consumeRetry) {
        throw normalizedError;
      }
      options.signal?.throwIfAborted();
      return false;
    }
    if (!await options.shouldRetry(context)) {
      throw normalizedError;
    }
    if (!consumeRetry) {
      options.signal?.throwIfAborted();
      return false;
    }
    const delayTime = calculateDelay(retriesConsumed, options);
    const finalDelay = Math.min(delayTime, remainingTime);
    if (finalDelay > 0) {
      await new Promise((resolve, reject) => {
        const onAbort = () => {
          clearTimeout(timeoutToken);
          options.signal?.removeEventListener("abort", onAbort);
          reject(options.signal.reason);
        };
        const timeoutToken = setTimeout(() => {
          options.signal?.removeEventListener("abort", onAbort);
          resolve();
        }, finalDelay);
        if (options.unref) {
          timeoutToken.unref?.();
        }
        options.signal?.addEventListener("abort", onAbort, { once: true });
      });
    }
    options.signal?.throwIfAborted();
    return true;
  }
  async function pRetry(input, options = {}) {
    options = { ...options };
    validateRetries(options.retries);
    if (Object.hasOwn(options, "forever")) {
      throw new Error("The `forever` option is no longer supported. For many use-cases, you can set `retries: Infinity` instead.");
    }
    options.retries ??= 10;
    options.factor ??= 2;
    options.minTimeout ??= 1e3;
    options.maxTimeout ??= Number.POSITIVE_INFINITY;
    options.maxRetryTime ??= Number.POSITIVE_INFINITY;
    options.randomize ??= false;
    options.onFailedAttempt ??= () => {
    };
    options.shouldRetry ??= () => true;
    options.shouldConsumeRetry ??= () => true;
    validateNumberOption("factor", options.factor, { min: 0, allowInfinity: false });
    validateNumberOption("minTimeout", options.minTimeout, { min: 0, allowInfinity: false });
    validateNumberOption("maxTimeout", options.maxTimeout, { min: 0, allowInfinity: true });
    validateNumberOption("maxRetryTime", options.maxRetryTime, { min: 0, allowInfinity: true });
    if (!(options.factor > 0)) {
      options.factor = 1;
    }
    options.signal?.throwIfAborted();
    let attemptNumber = 0;
    let retriesConsumed = 0;
    const startTime = performance.now();
    while (Number.isFinite(options.retries) ? retriesConsumed <= options.retries : true) {
      attemptNumber++;
      try {
        options.signal?.throwIfAborted();
        const result = await input(attemptNumber);
        options.signal?.throwIfAborted();
        return result;
      } catch (error) {
        if (await onAttemptFailure({
          error,
          attemptNumber,
          retriesConsumed,
          startTime,
          options
        })) {
          retriesConsumed++;
        }
      }
    }
    throw new Error("Retry attempts exhausted without throwing an error.");
  }
  async function resolveAnkiCards(path, names) {
    if (path === "") path = "gifted-vav/.anki-cards";
    else if (!path.startsWith("/")) path = `gifted-vav/.anki-cards/${path}`;
    if (path.endsWith("*")) {
      let files2 = [];
      for (let i = 0; i < names.length; i++) {
        files2[i] = path.replace("*", names[i]);
        console.log("Resolved: ", files2);
      }
      return files2;
    }
    let api = "http://localhost:5000/resolve-files";
    let url = myCodespace.applyForwarding(api);
    console.log(`FETCHING: from '${url}' path='${path}'`);
    let fetchIt = async () => fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, names })
    });
    let response = await pRetry(fetchIt, { retries: 60, minTimeout: 2e3 });
    let files = await response.json();
    console.log("FILES are resolved: ", files);
    return files;
  }
  var root_7 = /* @__PURE__ */ from_html(`<p> </p>`);
  var root_2 = /* @__PURE__ */ from_html(`<div class="grid svelte-1ylk30j"><!></div>`);
  var root$2 = /* @__PURE__ */ from_html(`<!> <!> <div><!></div>`, 1);
  const $$css$3 = {
    hash: "svelte-1ylk30j",
    code: ".grid.svelte-1ylk30j {display:grid;grid-template-columns:repeat(auto-fill, var(--card-width));gap:16px;justify-content:space-evenly;}"
  };
  function Anki_cards($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$3);
    const card = ($$anchor2, path2 = noop) => {
      const id = /* @__PURE__ */ user_derived(() => helpers.getFileName(path2()));
      AnkiCard($$anchor2, {
        get id() {
          return get$1(id);
        },
        get path() {
          return path2();
        },
        get width() {
          return width;
        },
        get height() {
          return height;
        },
        get port() {
          return port;
        },
        get scale() {
          return scale;
        },
        get clickToStart() {
          return clickToStart2;
        }
      });
    };
    const gridOfCards = ($$anchor2, ids2 = noop) => {
      var div = root_2();
      var node = child(div);
      await_block(
        node,
        () => resolveAnkiCards(path, ids2()),
        ($$anchor3) => {
          Spin($$anchor3, { msg: "Resolving cards..." });
        },
        ($$anchor3, paths) => {
          var fragment_1 = comment();
          var node_1 = first_child(fragment_1);
          {
            var consequent = ($$anchor4) => {
              var fragment_2 = comment();
              var node_2 = first_child(fragment_2);
              each(node_2, 17, () => get$1(paths), index, ($$anchor5, path2, $$index, $$array) => {
                card($$anchor5, () => get$1(path2));
              });
              append($$anchor4, fragment_2);
            };
            var alternate = ($$anchor4) => {
              Alert($$anchor4, { type: "error", message: "No cards are found" });
            };
            if_block(node_1, ($$render) => {
              if (get$1(paths).length > 0) $$render(consequent);
              else $$render(alternate, false);
            });
          }
          append($$anchor3, fragment_1);
        },
        ($$anchor3, error) => {
          var p = root_7();
          var text2 = child(p);
          reset(p);
          template_effect(() => set_text(text2, `Something went wrong: ${get$1(error).message ?? ""}`));
          append($$anchor3, p);
        }
      );
      reset(div);
      append($$anchor2, div);
    };
    let mdArgs = /* @__PURE__ */ rest_props($$props, ["$$slots", "$$events", "$$legacy", "$$host"]);
    let {
      list,
      path = "",
      width = 300,
      height = 0,
      port = 5174,
      scale = 1,
      take = 0
    } = mdArgs;
    let clickToStart2 = "click-to-start" in mdArgs;
    let takeAt = "take-at" in mdArgs;
    if (height === 0) height = Math.trunc(width * (3 / 2));
    let mdIds = lib.parse(list);
    if (take) {
      take = Number(take);
      if (!Number.isNaN(take)) {
        mdIds = lodashExports.shuffle(lodashExports.sampleSize(mdIds, take));
      }
    }
    let at = takeAt ? myPage2.takeAt.get() % mdIds.length : 0;
    let ids = takeAt ? [mdIds[at]] : mdIds;
    var fragment_6 = root$2();
    var node_3 = first_child(fragment_6);
    WithAnki(node_3, {});
    var node_4 = sibling(node_3, 2);
    ClearFallbackHtml(node_4);
    var div_1 = sibling(node_4, 2);
    var node_5 = child(div_1);
    gridOfCards(node_5, () => ids);
    reset(div_1);
    attach(div_1, () => preventDblClick);
    template_effect(() => set_style(div_1, `--card-width: ${width ?? ""}px;`));
    append($$anchor, fragment_6);
    pop$1();
  }
  customElements.define("anki-cards", create_custom_element(Anki_cards, {}, [], [], false));
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
  function copyToClipboard(text2) {
    const t = document.createElement("textarea");
    t.value = text2;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  }
  function clientToArea(div, area) {
    let sx = div.clientWidth / area.width;
    let sy = div.clientHeight / area.height;
    return {
      sx,
      sy,
      toClientX: (x) => Math.floor(x * sx),
      toClientY: (y) => Math.floor(y * sy),
      toClient: (x, y) => ({
        left: Math.floor(x * sx),
        top: Math.floor(y * sy)
      }),
      toArea: (x, y) => ({
        left: Math.floor(x / sx),
        top: Math.floor(y / sy)
      })
    };
  }
  function onclick(e, visible) {
    set(visible, !get$1(visible));
  }
  var root$1 = /* @__PURE__ */ from_html(`<div></div>`);
  const $$css$2 = {
    hash: "svelte-18s50q7",
    code: ".panel.svelte-18s50q7 {position:absolute;box-sizing:border-box;border-radius:12px;left:var(--left);top:var(--top);width:var(--width);height:var(--height);background-color:color-mix(in srgb, var(--bgColor) 100%, transparent);transition:background-color 0.3s ease, box-shadow 0.3s ease;}.visible.svelte-18s50q7 {background-color:color-mix(in srgb, var(--bgColor) 0%, transparent);}.panel.svelte-18s50q7:hover {cursor:pointer;box-shadow:0 4px 12px rgba(0, 0, 0, 0.3);}"
  };
  function ImgArea($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$2);
    let parent = prop($$props, "parent", 7), at = prop($$props, "at", 7), parentSize = prop($$props, "parentSize", 7), bgColor = prop($$props, "bgColor", 7);
    let coords = clientToArea(parent(), parentSize());
    let visible = /* @__PURE__ */ state$1(false);
    var div = root$1();
    let classes;
    div.__click = [onclick, visible];
    template_effect(
      ($0, $1, $2, $3, $4) => {
        classes = set_class(div, 1, "panel svelte-18s50q7", null, classes, $0);
        set_style(div, `
        --left: ${$1 ?? ""}px;
        --top: ${$2 ?? ""}px;
        --width: ${$3 ?? ""}px;
        --height: ${$4 ?? ""}px;
        --bgColor: ${bgColor() ?? ""};
    `);
      },
      [
        () => ({ visible: get$1(visible) }),
        () => coords.toClientX(at()[0]),
        () => coords.toClientY(at()[1]),
        () => coords.toClientX(at()[2]),
        () => coords.toClientY(at()[3])
      ]
    );
    append($$anchor, div);
    return pop$1({
      get parent() {
        return parent();
      },
      set parent($$value) {
        parent($$value);
        flushSync();
      },
      get at() {
        return at();
      },
      set at($$value) {
        at($$value);
        flushSync();
      },
      get parentSize() {
        return parentSize();
      },
      set parentSize($$value) {
        parentSize($$value);
        flushSync();
      },
      get bgColor() {
        return bgColor();
      },
      set bgColor($$value) {
        bgColor($$value);
        flushSync();
      }
    });
  }
  delegate(["click"]);
  create_custom_element(ImgArea, { parent: {}, at: {}, parentSize: {}, bgColor: {} }, [], [], true);
  var on_pointerdown = (e, onpointerdown) => onpointerdown(e, "drag");
  var on_pointerdown_1 = (e, onpointerdown) => onpointerdown(e, "resize");
  var root_1$1 = /* @__PURE__ */ from_html(`<span class="coords svelte-1jqt36q"> </span>`);
  var root = /* @__PURE__ */ from_html(`<div class="selector svelte-1jqt36q"><div class="drag svelte-1jqt36q"></div> <div class="resize svelte-1jqt36q"></div> <!></div>`);
  const $$css$1 = {
    hash: "svelte-1jqt36q",
    code: ".selector.svelte-1jqt36q {position:absolute;box-sizing:border-box;border:2px solid red;border-radius:8px;z-index:2;background:color-mix(in srgb, bisque 50%, transparent);left:var(--left);top:var(--top);width:var(--width);height:var(--height);}.drag.svelte-1jqt36q {position:absolute;inset:0;cursor:move;}.resize.svelte-1jqt36q {position:absolute;width:12px;height:12px;right:-6px;bottom:-6px;border:2px solid red;border-radius:4px;background:white;box-sizing:border-box;cursor:se-resize;}.coords.svelte-1jqt36q {position:absolute;left:2;bottom:0;font-family:monospace;font-style:italic;color:black;display:inline-block;width:100%;white-space:nowrap;overflow:hidden;text-overflow:clip;}"
  };
  function AreaSelector($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css$1);
    let parent = prop($$props, "parent", 7), at = prop($$props, "at", 7), minSize = prop($$props, "minSize", 7), parentSize = prop($$props, "parentSize", 7), showCoords = prop($$props, "showCoords", 7);
    let pos2 = /* @__PURE__ */ state$1(proxy(at()));
    let areaStr = /* @__PURE__ */ user_derived(() => `[x:${get$1(pos2).left} y:${get$1(pos2).top} ${get$1(pos2).width}x${get$1(pos2).height}]`);
    let coords = clientToArea(parent(), parentSize());
    let dragging = null;
    console.log(`AreaSelector: [${parent().clientWidth}x${parent().clientHeight}] -> [${coords.sx}x${coords.sy}]`, parent());
    function onclick2(e) {
      let text2 = `[${get$1(pos2).left},${get$1(pos2).top},${get$1(pos2).width},${get$1(pos2).height}]`;
      copyToClipboard(text2);
    }
    function toParent(e) {
      let parentRect = parent().getBoundingClientRect();
      return {
        parentX: e.clientX - parentRect.left,
        parentY: e.clientY - parentRect.top
      };
    }
    function onpointerdown(e, mode) {
      e.preventDefault();
      let { parentX, parentY } = toParent(e);
      let { left, top } = coords.toArea(parentX, parentY);
      dragging = { mode, start: { left, top }, origin: { ...get$1(pos2) } };
      e.target.setPointerCapture(e.pointerId);
    }
    function onpointerup(e) {
      dragging = null;
    }
    function onpointercancel(e) {
      dragging = null;
    }
    function onpointermove(e) {
      if (!dragging) return;
      let { parentX, parentY } = toParent(e);
      let { left, top } = coords.toArea(parentX, parentY);
      left = clamp(left, 0, parentSize().width);
      top = clamp(top, 0, parentSize().height);
      let dx = left - dragging.start.left;
      let dy = top - dragging.start.top;
      switch (dragging.mode) {
        case "drag":
          get$1(pos2).left = clamp(dragging.origin.left + dx, 0, parentSize().width - get$1(pos2).width);
          get$1(pos2).top = clamp(dragging.origin.top + dy, 0, parentSize().height - get$1(pos2).height);
          break;
        case "resize":
          get$1(pos2).width = clamp(dragging.origin.width + dx, minSize().width, parentSize().width - get$1(pos2).left);
          get$1(pos2).height = clamp(dragging.origin.height + dy, minSize().height, parentSize().height - get$1(pos2).top);
          break;
      }
    }
    parent().addEventListener("click", onclick2);
    var div = root();
    div.__pointermove = onpointermove;
    div.__pointerup = onpointerup;
    var div_1 = child(div);
    div_1.__pointerdown = [on_pointerdown, onpointerdown];
    var div_2 = sibling(div_1, 2);
    div_2.__pointerdown = [on_pointerdown_1, onpointerdown];
    var node = sibling(div_2, 2);
    {
      var consequent = ($$anchor2) => {
        var span = root_1$1();
        var text_1 = child(span, true);
        reset(span);
        template_effect(() => set_text(text_1, get$1(areaStr)));
        append($$anchor2, span);
      };
      if_block(node, ($$render) => {
        if (showCoords()) $$render(consequent);
      });
    }
    reset(div);
    template_effect(
      ($0, $1, $2, $3) => set_style(div, `
        --left: ${$0 ?? ""}px;
        --top: ${$1 ?? ""}px;
        --width: ${$2 ?? ""}px;
        --height: ${$3 ?? ""}px;
    `),
      [
        () => coords.toClientX(get$1(pos2).left),
        () => coords.toClientY(get$1(pos2).top),
        () => coords.toClientX(get$1(pos2).width),
        () => coords.toClientY(get$1(pos2).height)
      ]
    );
    event("pointercancel", div, onpointercancel);
    append($$anchor, div);
    return pop$1({
      get parent() {
        return parent();
      },
      set parent($$value) {
        parent($$value);
        flushSync();
      },
      get at() {
        return at();
      },
      set at($$value) {
        at($$value);
        flushSync();
      },
      get minSize() {
        return minSize();
      },
      set minSize($$value) {
        minSize($$value);
        flushSync();
      },
      get parentSize() {
        return parentSize();
      },
      set parentSize($$value) {
        parentSize($$value);
        flushSync();
      },
      get showCoords() {
        return showCoords();
      },
      set showCoords($$value) {
        showCoords($$value);
        flushSync();
      }
    });
  }
  delegate(["pointermove", "pointerup", "pointerdown"]);
  create_custom_element(
    AreaSelector,
    {
      parent: {},
      at: {},
      minSize: {},
      parentSize: {},
      showCoords: {}
    },
    [],
    [],
    true
  );
  var root_1 = /* @__PURE__ */ from_html(`<div><!> <!> <img alt="N/A" class="svelte-1sf2y7n"/></div>`);
  const $$css = {
    hash: "svelte-1sf2y7n",
    code: ".parent.svelte-1sf2y7n {display:inline-block;position:relative;user-select:none;}.hasWidth.svelte-1sf2y7n {max-width:var(--width);}img.svelte-1sf2y7n {width:100%;height:auto;}"
  };
  function Img_areas($$anchor, $$props) {
    push$1($$props, true);
    append_styles$1($$anchor, $$css);
    let src = prop($$props, "src", 7), width = prop($$props, "width", 7, 2e3), hide = prop($$props, "hide", 7), edit = prop($$props, "edit", 7), dx = prop($$props, "dx", 7, 100), dy = prop($$props, "dy", 7, 100);
    let hasWidth = width() !== void 0;
    let areasToHide = lib.parse(hide());
    let editMode = edit() !== void 0;
    let div;
    let imgIsReady = /* @__PURE__ */ state$1(false);
    let parentSize = { width: dx(), height: dy() };
    let pageWidth = /* @__PURE__ */ state$1(proxy(width()));
    function initialize() {
      set(imgIsReady, true);
    }
    function resize() {
      let newWidth = Math.min(window.innerWidth - 50, width());
      if (get$1(pageWidth) !== newWidth) {
        set(pageWidth, newWidth, true);
        set(imgIsReady, false);
      }
    }
    user_effect(() => {
      resize();
      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("resize", resize);
      };
    });
    var fragment = comment();
    var node = first_child(fragment);
    key$1(node, () => get$1(pageWidth), ($$anchor2) => {
      var div_1 = root_1();
      let classes;
      var node_1 = child(div_1);
      {
        var consequent = ($$anchor3) => {
          AreaSelector($$anchor3, {
            get parent() {
              return div;
            },
            at: { left: 0, top: 0, width: 15, height: 10 },
            minSize: { width: 5, height: 5 },
            get parentSize() {
              return parentSize;
            },
            showCoords: false
          });
        };
        if_block(node_1, ($$render) => {
          if (editMode && get$1(imgIsReady)) $$render(consequent);
        });
      }
      var node_2 = sibling(node_1, 2);
      {
        var consequent_1 = ($$anchor3) => {
          var fragment_2 = comment();
          var node_3 = first_child(fragment_2);
          each(node_3, 17, () => areasToHide, index, ($$anchor4, area) => {
            ImgArea($$anchor4, {
              get parent() {
                return div;
              },
              get at() {
                return get$1(area);
              },
              get parentSize() {
                return parentSize;
              },
              bgColor: "azure"
            });
          });
          append($$anchor3, fragment_2);
        };
        if_block(node_2, ($$render) => {
          if (get$1(imgIsReady)) $$render(consequent_1);
        });
      }
      var img = sibling(node_2, 2);
      reset(div_1);
      bind_this(div_1, ($$value) => div = $$value, () => div);
      template_effect(
        ($0) => {
          classes = set_class(div_1, 1, "parent svelte-1sf2y7n", null, classes, $0);
          set_style(div_1, `--width: ${width() ?? ""}px`);
          set_attribute(img, "src", src());
        },
        [() => ({ hasWidth })]
      );
      event("load", img, () => initialize());
      replay_events(img);
      append($$anchor2, div_1);
    });
    append($$anchor, fragment);
    return pop$1({
      get src() {
        return src();
      },
      set src($$value) {
        src($$value);
        flushSync();
      },
      get width() {
        return width();
      },
      set width($$value = 2e3) {
        width($$value);
        flushSync();
      },
      get hide() {
        return hide();
      },
      set hide($$value) {
        hide($$value);
        flushSync();
      },
      get edit() {
        return edit();
      },
      set edit($$value) {
        edit($$value);
        flushSync();
      },
      get dx() {
        return dx();
      },
      set dx($$value = 100) {
        dx($$value);
        flushSync();
      },
      get dy() {
        return dy();
      },
      set dy($$value = 100) {
        dy($$value);
        flushSync();
      }
    });
  }
  customElements.define("img-areas", create_custom_element(Img_areas, { src: {}, width: {}, hide: {}, edit: {}, dx: {}, dy: {} }, [], [], false));
  addToMyRoot(document.head, ["tailwind", "daisy-ui"]);
  console.log(`Hi, I am your Gebemot :) ${VERSION}`);
})();
