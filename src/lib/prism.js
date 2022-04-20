/* PrismJS 1.28.0
https://prismjs.com/download.html#themes=prism&languages=bash+diff+git+makefile+powershell+regex&plugins=line-highlight+line-numbers+file-highlight+command-line+toolbar+copy-to-clipboard+diff-highlight */
/// <reference lib="WebWorker"/>

var _self =
	typeof window !== 'undefined'
		? window // if in browser
		: typeof WorkerGlobalScope !== 'undefined' &&
		  self instanceof WorkerGlobalScope
		? self // if in worker
		: {} // if in node js

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self) {
	// Private helper vars
	var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i
	var uniqueId = 0

	// The grammar object for plaintext
	var plainTextGrammar = {}

	var _ = {
		/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		manual: _self.Prism && _self.Prism.manual,
		/**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		disableWorkerMessageHandler:
			_self.Prism && _self.Prism.disableWorkerMessageHandler,

		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(
						tokens.type,
						encode(tokens.content),
						tokens.alias
					)
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode)
				} else {
					return tokens
						.replace(/&/g, '&amp;')
						.replace(/</g, '&lt;')
						.replace(/\u00a0/g, ' ')
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1)
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId })
				}
				return obj['__id']
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {}

				var clone
				var id
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o)
						if (visited[id]) {
							return visited[id]
						}
						clone = /** @type {Record<string, any>} */ ({})
						visited[id] = clone

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited)
							}
						}

						return /** @type {any} */ (clone)

					case 'Array':
						id = _.util.objId(o)
						if (visited[id]) {
							return visited[id]
						}
						clone = []
						visited[id] = clone

						;/** @type {Array} */ (/** @type {any} */ (o)).forEach(
							function (v, i) {
								clone[i] = deepClone(v, visited)
							}
						)

						return /** @type {any} */ (clone)

					default:
						return o
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element) {
					var m = lang.exec(element.className)
					if (m) {
						return m[1].toLowerCase()
					}
					element = element.parentElement
				}
				return 'none'
			},

			/**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */
			setLanguage: function (element, language) {
				// remove all `language-xxxx` classes
				// (this might leave behind a leading space)
				element.className = element.className.replace(
					RegExp(lang, 'gi'),
					''
				)

				// add the new `language-xxxx` class
				// (using `classList` will automatically clean up spaces for us)
				element.classList.add('language-' + language)
			},

			/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */
			currentScript: function () {
				if (typeof document === 'undefined') {
					return null
				}
				if (
					'currentScript' in document &&
					1 < 2 /* hack to trip TS' flow analysis */
				) {
					return /** @type {any} */ (document.currentScript)
				}

				// IE11 workaround
				// we'll get the src of the current script by parsing IE11's error stack trace
				// this will not work for inline scripts

				try {
					throw new Error()
				} catch (err) {
					// Get file src url from stack. Specifically works with the format of stack traces in IE.
					// A stack will look like this:
					//
					// Error
					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
					//    at Global code (http://localhost/components/prism-core.js:606:1)

					var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(
						err.stack
					) || [])[1]
					if (src) {
						var scripts = document.getElementsByTagName('script')
						for (var i in scripts) {
							if (scripts[i].src == src) {
								return scripts[i]
							}
						}
					}
					return null
				}
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className

				while (element) {
					var classList = element.classList
					if (classList.contains(className)) {
						return true
					}
					if (classList.contains(no)) {
						return false
					}
					element = element.parentElement
				}
				return !!defaultActivation
			},
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id])

				for (var key in redef) {
					lang[key] = redef[key]
				}

				return lang
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages)
				var grammar = root[inside]
				/** @type {Grammar} */
				var ret = {}

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {
						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken]
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token]
						}
					}
				}

				var old = root[inside]
				root[inside] = ret

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret
					}
				})

				return ret
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {}

				var objId = _.util.objId

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i)

						var property = o[i]
						var propertyType = _.util.type(property)

						if (
							propertyType === 'Object' &&
							!visited[objId(property)]
						) {
							visited[objId(property)] = true
							DFS(property, callback, null, visited)
						} else if (
							propertyType === 'Array' &&
							!visited[objId(property)]
						) {
							visited[objId(property)] = true
							DFS(property, callback, i, visited)
						}
					}
				}
			},
		},

		plugins: {},

		/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */
		highlightAll: function (async, callback) {
			_.highlightAllUnder(document, async, callback)
		},

		/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */
		highlightAllUnder: function (container, async, callback) {
			var env = {
				callback: callback,
				container: container,
				selector:
					'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
			}

			_.hooks.run('before-highlightall', env)

			env.elements = Array.prototype.slice.apply(
				env.container.querySelectorAll(env.selector)
			)

			_.hooks.run('before-all-elements-highlight', env)

			for (var i = 0, element; (element = env.elements[i++]); ) {
				_.highlightElement(element, async === true, env.callback)
			}
		},

		/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */
		highlightElement: function (element, async, callback) {
			// Find language
			var language = _.util.getLanguage(element)
			var grammar = _.languages[language]

			// Set language on the element, if not present
			_.util.setLanguage(element, language)

			// Set language on the parent, for styling
			var parent = element.parentElement
			if (parent && parent.nodeName.toLowerCase() === 'pre') {
				_.util.setLanguage(parent, language)
			}

			var code = element.textContent

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code,
			}

			function insertHighlightedCode(highlightedCode) {
				env.highlightedCode = highlightedCode

				_.hooks.run('before-insert', env)

				env.element.innerHTML = env.highlightedCode

				_.hooks.run('after-highlight', env)
				_.hooks.run('complete', env)
				callback && callback.call(env.element)
			}

			_.hooks.run('before-sanity-check', env)

			// plugins may change/add the parent/element
			parent = env.element.parentElement
			if (
				parent &&
				parent.nodeName.toLowerCase() === 'pre' &&
				!parent.hasAttribute('tabindex')
			) {
				parent.setAttribute('tabindex', '0')
			}

			if (!env.code) {
				_.hooks.run('complete', env)
				callback && callback.call(env.element)
				return
			}

			_.hooks.run('before-highlight', env)

			if (!env.grammar) {
				insertHighlightedCode(_.util.encode(env.code))
				return
			}

			if (async && _self.Worker) {
				var worker = new Worker(_.filename)

				worker.onmessage = function (evt) {
					insertHighlightedCode(evt.data)
				}

				worker.postMessage(
					JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true,
					})
				)
			} else {
				insertHighlightedCode(
					_.highlight(env.code, env.grammar, env.language)
				)
			}
		},

		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language,
			}
			_.hooks.run('before-tokenize', env)
			if (!env.grammar) {
				throw new Error(
					'The language "' + env.language + '" has no grammar.'
				)
			}
			env.tokens = _.tokenize(env.code, env.grammar)
			_.hooks.run('after-tokenize', env)
			return Token.stringify(_.util.encode(env.tokens), env.language)
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token]
				}

				delete grammar.rest
			}

			var tokenList = new LinkedList()
			addAfter(tokenList, tokenList.head, text)

			matchGrammar(text, tokenList, grammar, tokenList.head, 0)

			return toArray(tokenList)
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all

				hooks[name] = hooks[name] || []

				hooks[name].push(callback)
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name]

				if (!callbacks || !callbacks.length) {
					return
				}

				for (var i = 0, callback; (callback = callbacks[i++]); ) {
					callback(env)
				}
			},
		},

		Token: Token,
	}
	_self.Prism = _

	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o
		}
		if (Array.isArray(o)) {
			var s = ''
			o.forEach(function (e) {
				s += stringify(e, language)
			})
			return s
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language,
		}

		var aliases = o.alias
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases)
			} else {
				env.classes.push(aliases)
			}
		}

		_.hooks.run('wrap', env)

		var attributes = ''
		for (var name in env.attributes) {
			attributes +=
				' ' +
				name +
				'="' +
				(env.attributes[name] || '').replace(/"/g, '&quot;') +
				'"'
		}

		return (
			'<' +
			env.tag +
			' class="' +
			env.classes.join(' ') +
			'"' +
			attributes +
			'>' +
			env.content +
			'</' +
			env.tag +
			'>'
		)
	}

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos
		var match = pattern.exec(text)
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length
			match.index += lookbehindLength
			match[0] = match[0].slice(lookbehindLength)
		}
		return match
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(
		text,
		tokenList,
		grammar,
		startNode,
		startPos,
		rematch
	) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue
			}

			var patterns = grammar[token]
			patterns = Array.isArray(patterns) ? patterns : [patterns]

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return
				}

				var patternObj = patterns[j]
				var inside = patternObj.inside
				var lookbehind = !!patternObj.lookbehind
				var greedy = !!patternObj.greedy
				var alias = patternObj.alias

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern
						.toString()
						.match(/[imsuy]*$/)[0]
					patternObj.pattern = RegExp(
						patternObj.pattern.source,
						flags + 'g'
					)
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj

				for (
					// iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length,
						currentNode = currentNode.next
				) {
					if (rematch && pos >= rematch.reach) {
						break
					}

					var str = currentNode.value

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return
					}

					if (str instanceof Token) {
						continue
					}

					var removeCount = 1 // this is the to parameter of removeBetween
					var match

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind)
						if (!match || match.index >= text.length) {
							break
						}

						var from = match.index
						var to = match.index + match[0].length
						var p = pos

						// find the node that contains the match
						p += currentNode.value.length
						while (from >= p) {
							currentNode = currentNode.next
							p += currentNode.value.length
						}
						// adjust pos (and p)
						p -= currentNode.value.length
						pos = p

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail &&
							(p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++
							p += k.value.length
						}
						removeCount--

						// replace with the new match
						str = text.slice(pos, p)
						match.index -= pos
					} else {
						match = matchPattern(pattern, 0, str, lookbehind)
						if (!match) {
							continue
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index
					var matchStr = match[0]
					var before = str.slice(0, from)
					var after = str.slice(from + matchStr.length)

					var reach = pos + str.length
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach
					}

					var removeFrom = currentNode.prev

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before)
						pos += before.length
					}

					removeRange(tokenList, removeFrom, removeCount)

					var wrapped = new Token(
						token,
						inside ? _.tokenize(matchStr, inside) : matchStr,
						alias,
						matchStr
					)
					currentNode = addAfter(tokenList, removeFrom, wrapped)

					if (after) {
						addAfter(tokenList, currentNode, after)
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach,
						}
						matchGrammar(
							text,
							tokenList,
							grammar,
							currentNode.prev,
							pos,
							nestedRematch
						)

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null }
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null }
		head.next = tail

		/** @type {LinkedListNode<T>} */
		this.head = head
		/** @type {LinkedListNode<T>} */
		this.tail = tail
		this.length = 0
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next

		var newNode = { value: value, prev: node, next: next }
		node.next = newNode
		next.prev = newNode
		list.length++

		return newNode
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next
		}
		node.next = next
		next.prev = node
		list.length -= i
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = []
		var node = list.head.next
		while (node !== list.tail) {
			array.push(node.value)
			node = node.next
		}
		return array
	}

	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener(
				'message',
				function (evt) {
					var message = JSON.parse(evt.data)
					var lang = message.language
					var code = message.code
					var immediateClose = message.immediateClose

					_self.postMessage(
						_.highlight(code, _.languages[lang], lang)
					)
					if (immediateClose) {
						_self.close()
					}
				},
				false
			)
		}

		return _
	}

	// Get current script and highlight
	var script = _.util.currentScript()

	if (script) {
		_.filename = script.src

		if (script.hasAttribute('data-manual')) {
			_.manual = true
		}
	}

	function highlightAutomaticallyCallback() {
		if (!_.manual) {
			_.highlightAll()
		}
	}

	if (!_.manual) {
		// If the document state is "loading", then we'll use DOMContentLoaded.
		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
		// might take longer one animation frame to execute which can create a race condition where only some plugins have
		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
		// See https://github.com/PrismJS/prism/issues/2102
		var readyState = document.readyState
		if (
			readyState === 'loading' ||
			(readyState === 'interactive' && script && script.defer)
		) {
			document.addEventListener(
				'DOMContentLoaded',
				highlightAutomaticallyCallback
			)
		} else {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(highlightAutomaticallyCallback)
			} else {
				window.setTimeout(highlightAutomaticallyCallback, 16)
			}
		}
	}

	return _
})(_self)

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */
;(function (Prism) {
	// $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
	// + LC_ALL, RANDOM, REPLY, SECONDS.
	// + make sure PS1..4 are here as they are not always set,
	// - some useless things.
	var envVars =
		'\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b'

	var commandAfterHeredoc = {
		pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
		lookbehind: true,
		alias: 'punctuation', // this looks reasonably well in all themes
		inside: null, // see below
	}

	var insideString = {
		bash: commandAfterHeredoc,
		environment: {
			pattern: RegExp('\\$' + envVars),
			alias: 'constant',
		},
		variable: [
			// [0]: Arithmetic Environment
			{
				pattern: /\$?\(\([\s\S]+?\)\)/,
				greedy: true,
				inside: {
					// If there is a $ sign at the beginning highlight $(( and )) as variable
					variable: [
						{
							pattern: /(^\$\(\([\s\S]+)\)\)/,
							lookbehind: true,
						},
						/^\$\(\(/,
					],
					number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
					// Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
					operator:
						/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
					// If there is no $ sign at the beginning highlight (( and )) as punctuation
					punctuation: /\(\(?|\)\)?|,|;/,
				},
			},
			// [1]: Command Substitution
			{
				pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
				greedy: true,
				inside: {
					variable: /^\$\(|^`|\)$|`$/,
				},
			},
			// [2]: Brace expansion
			{
				pattern: /\$\{[^}]+\}/,
				greedy: true,
				inside: {
					operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
					punctuation: /[\[\]]/,
					environment: {
						pattern: RegExp('(\\{)' + envVars),
						lookbehind: true,
						alias: 'constant',
					},
				},
			},
			/\$(?:\w+|[#?*!@$])/,
		],
		// Escape sequences from echo and printf's manuals, and escaped quotes.
		entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/,
	}

	Prism.languages.bash = {
		shebang: {
			pattern: /^#!\s*\/.*/,
			alias: 'important',
		},
		comment: {
			pattern: /(^|[^"{\\$])#.*/,
			lookbehind: true,
		},
		'function-name': [
			// a) function foo {
			// b) foo() {
			// c) function foo() {
			// but not “foo {”
			{
				// a) and c)
				pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
				lookbehind: true,
				alias: 'function',
			},
			{
				// b)
				pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
				alias: 'function',
			},
		],
		// Highlight variable names as variables in for and select beginnings.
		'for-or-select': {
			pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
			alias: 'variable',
			lookbehind: true,
		},
		// Highlight variable names as variables in the left-hand part
		// of assignments (“=” and “+=”).
		'assign-left': {
			pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
			inside: {
				environment: {
					pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + envVars),
					lookbehind: true,
					alias: 'constant',
				},
			},
			alias: 'variable',
			lookbehind: true,
		},
		string: [
			// Support for Here-documents https://en.wikipedia.org/wiki/Here_document
			{
				pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
				lookbehind: true,
				greedy: true,
				inside: insideString,
			},
			// Here-document with quotes around the tag
			// → No expansion (so no “inside”).
			{
				pattern:
					/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
				lookbehind: true,
				greedy: true,
				inside: {
					bash: commandAfterHeredoc,
				},
			},
			// “Normal” string
			{
				// https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
				pattern:
					/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
				lookbehind: true,
				greedy: true,
				inside: insideString,
			},
			{
				// https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
				pattern: /(^|[^$\\])'[^']*'/,
				lookbehind: true,
				greedy: true,
			},
			{
				// https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
				pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
				greedy: true,
				inside: {
					entity: insideString.entity,
				},
			},
		],
		environment: {
			pattern: RegExp('\\$?' + envVars),
			alias: 'constant',
		},
		variable: insideString.variable,
		function: {
			pattern:
				/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
			lookbehind: true,
		},
		keyword: {
			pattern:
				/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
			lookbehind: true,
		},
		// https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
		builtin: {
			pattern:
				/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
			lookbehind: true,
			// Alias added to make those easier to distinguish from strings.
			alias: 'class-name',
		},
		boolean: {
			pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
			lookbehind: true,
		},
		'file-descriptor': {
			pattern: /\B&\d\b/,
			alias: 'important',
		},
		operator: {
			// Lots of redirections here, but not just that.
			pattern:
				/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
			inside: {
				'file-descriptor': {
					pattern: /^\d/,
					alias: 'important',
				},
			},
		},
		punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
		number: {
			pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
			lookbehind: true,
		},
	}

	commandAfterHeredoc.inside = Prism.languages.bash

	/* Patterns in command substitution. */
	var toBeCopied = [
		'comment',
		'function-name',
		'for-or-select',
		'assign-left',
		'string',
		'environment',
		'function',
		'keyword',
		'builtin',
		'boolean',
		'file-descriptor',
		'operator',
		'punctuation',
		'number',
	]
	var inside = insideString.variable[1].inside
	for (var i = 0; i < toBeCopied.length; i++) {
		inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]]
	}

	Prism.languages.shell = Prism.languages.bash
})(Prism)

;(function (Prism) {
	Prism.languages.diff = {
		coord: [
			// Match all kinds of coord lines (prefixed by "+++", "---" or "***").
			/^(?:\*{3}|-{3}|\+{3}).*$/m,
			// Match "@@ ... @@" coord lines in unified diff.
			/^@@.*@@$/m,
			// Match coord lines in normal diff (starts with a number).
			/^\d.*$/m,
		],

		// deleted, inserted, unchanged, diff
	}

	/**
	 * A map from the name of a block to its line prefix.
	 *
	 * @type {Object<string, string>}
	 */
	var PREFIXES = {
		'deleted-sign': '-',
		'deleted-arrow': '<',
		'inserted-sign': '+',
		'inserted-arrow': '>',
		unchanged: ' ',
		diff: '!',
	}

	// add a token for each prefix
	Object.keys(PREFIXES).forEach(function (name) {
		var prefix = PREFIXES[name]

		var alias = []
		if (!/^\w+$/.test(name)) {
			// "deleted-sign" -> "deleted"
			alias.push(/\w+/.exec(name)[0])
		}
		if (name === 'diff') {
			alias.push('bold')
		}

		Prism.languages.diff[name] = {
			pattern: RegExp(
				'^(?:[' + prefix + '].*(?:\r\n?|\n|(?![\\s\\S])))+',
				'm'
			),
			alias: alias,
			inside: {
				line: {
					pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
					lookbehind: true,
				},
				prefix: {
					pattern: /[\s\S]/,
					alias: /\w+/.exec(name)[0],
				},
			},
		}
	})

	// make prefixes available to Diff plugin
	Object.defineProperty(Prism.languages.diff, 'PREFIXES', {
		value: PREFIXES,
	})
})(Prism)

Prism.languages.git = {
	/*
	 * A simple one line comment like in a git status command
	 * For instance:
	 * $ git status
	 * # On branch infinite-scroll
	 * # Your branch and 'origin/sharedBranches/frontendTeam/infinite-scroll' have diverged,
	 * # and have 1 and 2 different commits each, respectively.
	 * nothing to commit (working directory clean)
	 */
	comment: /^#.*/m,

	/*
	 * Regexp to match the changed lines in a git diff output. Check the example below.
	 */
	deleted: /^[-–].*/m,
	inserted: /^\+.*/m,

	/*
	 * a string (double and simple quote)
	 */
	string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,

	/*
	 * a git command. It starts with a random prompt finishing by a $, then "git" then some other parameters
	 * For instance:
	 * $ git add file.txt
	 */
	command: {
		pattern: /^.*\$ git .*$/m,
		inside: {
			/*
			 * A git command can contain a parameter starting by a single or a double dash followed by a string
			 * For instance:
			 * $ git diff --cached
			 * $ git log -p
			 */
			parameter: /\s--?\w+/,
		},
	},

	/*
	 * Coordinates displayed in a git diff command
	 * For instance:
	 * $ git diff
	 * diff --git file.txt file.txt
	 * index 6214953..1d54a52 100644
	 * --- file.txt
	 * +++ file.txt
	 * @@ -1 +1,2 @@
	 * -Here's my tetx file
	 * +Here's my text file
	 * +And this is the second line
	 */
	coord: /^@@.*@@$/m,

	/*
	 * Match a "commit [SHA1]" line in a git log output.
	 * For instance:
	 * $ git log
	 * commit a11a14ef7e26f2ca62d4b35eac455ce636d0dc09
	 * Author: lgiraudel
	 * Date:   Mon Feb 17 11:18:34 2014 +0100
	 *
	 *     Add of a new line
	 */
	'commit-sha1': /^commit \w{40}$/m,
}

Prism.languages.makefile = {
	comment: {
		pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
		lookbehind: true,
	},
	string: {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true,
	},

	'builtin-target': {
		pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
		alias: 'builtin',
	},

	target: {
		pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
		alias: 'symbol',
		inside: {
			variable: /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/,
		},
	},
	variable: /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,

	// Directives
	keyword:
		/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,

	function: {
		pattern:
			/(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
		lookbehind: true,
	},
	operator: /(?:::|[?:+!])?=|[|@]/,
	punctuation: /[:;(){}]/,
}

;(function (Prism) {
	var powershell = (Prism.languages.powershell = {
		comment: [
			{
				pattern: /(^|[^`])<#[\s\S]*?#>/,
				lookbehind: true,
			},
			{
				pattern: /(^|[^`])#.*/,
				lookbehind: true,
			},
		],
		string: [
			{
				pattern: /"(?:`[\s\S]|[^`"])*"/,
				greedy: true,
				inside: null, // see below
			},
			{
				pattern: /'(?:[^']|'')*'/,
				greedy: true,
			},
		],
		// Matches name spaces as well as casts, attribute decorators. Force starting with letter to avoid matching array indices
		// Supports two levels of nested brackets (e.g. `[OutputType([System.Collections.Generic.List[int]])]`)
		namespace: /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
		boolean: /\$(?:false|true)\b/i,
		variable: /\$\w+\b/,
		// Cmdlets and aliases. Aliases should come last, otherwise "write" gets preferred over "write-host" for example
		// Get-Command | ?{ $_.ModuleName -match "Microsoft.PowerShell.(Util|Core|Management)" }
		// Get-Alias | ?{ $_.ReferencedCommand.Module.Name -match "Microsoft.PowerShell.(Util|Core|Management)" }
		function: [
			/\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
			/\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
		],
		// per http://technet.microsoft.com/en-us/library/hh847744.aspx
		keyword:
			/\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
		operator: {
			pattern:
				/(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
			lookbehind: true,
		},
		punctuation: /[|{}[\];(),.]/,
	})

	// Variable interpolation inside strings, and nested expressions
	powershell.string[0].inside = {
		function: {
			// Allow for one level of nesting
			pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
			lookbehind: true,
			inside: powershell,
		},
		boolean: powershell.boolean,
		variable: powershell.variable,
	}
})(Prism)

;(function (Prism) {
	var specialEscape = {
		pattern: /\\[\\(){}[\]^$+*?|.]/,
		alias: 'escape',
	}
	var escape =
		/\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/
	var charSet = {
		pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
		alias: 'class-name',
	}
	var charSetWithoutDot = {
		pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
		alias: 'class-name',
	}

	var rangeChar = '(?:[^\\\\-]|' + escape.source + ')'
	var range = RegExp(rangeChar + '-' + rangeChar)

	// the name of a capturing group
	var groupName = {
		pattern: /(<|')[^<>']+(?=[>']$)/,
		lookbehind: true,
		alias: 'variable',
	}

	Prism.languages.regex = {
		'char-class': {
			pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
			lookbehind: true,
			inside: {
				'char-class-negation': {
					pattern: /(^\[)\^/,
					lookbehind: true,
					alias: 'operator',
				},
				'char-class-punctuation': {
					pattern: /^\[|\]$/,
					alias: 'punctuation',
				},
				range: {
					pattern: range,
					inside: {
						escape: escape,
						'range-punctuation': {
							pattern: /-/,
							alias: 'operator',
						},
					},
				},
				'special-escape': specialEscape,
				'char-set': charSetWithoutDot,
				escape: escape,
			},
		},
		'special-escape': specialEscape,
		'char-set': charSet,
		backreference: [
			{
				// a backreference which is not an octal escape
				pattern: /\\(?![123][0-7]{2})[1-9]/,
				alias: 'keyword',
			},
			{
				pattern: /\\k<[^<>']+>/,
				alias: 'keyword',
				inside: {
					'group-name': groupName,
				},
			},
		],
		anchor: {
			pattern: /[$^]|\\[ABbGZz]/,
			alias: 'function',
		},
		escape: escape,
		group: [
			{
				// https://docs.oracle.com/javase/10/docs/api/java/util/regex/Pattern.html
				// https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference?view=netframework-4.7.2#grouping-constructs

				// (), (?<name>), (?'name'), (?>), (?:), (?=), (?!), (?<=), (?<!), (?is-m), (?i-m:)
				pattern:
					/\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
				alias: 'punctuation',
				inside: {
					'group-name': groupName,
				},
			},
			{
				pattern: /\)/,
				alias: 'punctuation',
			},
		],
		quantifier: {
			pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
			alias: 'number',
		},
		alternation: {
			pattern: /\|/,
			alias: 'keyword',
		},
	}
})(Prism)

;(function () {
	if (
		typeof Prism === 'undefined' ||
		typeof document === 'undefined' ||
		!document.querySelector
	) {
		return
	}

	var LINE_NUMBERS_CLASS = 'line-numbers'
	var LINKABLE_LINE_NUMBERS_CLASS = 'linkable-line-numbers'

	/**
	 * @param {string} selector
	 * @param {ParentNode} [container]
	 * @returns {HTMLElement[]}
	 */
	function $$(selector, container) {
		return Array.prototype.slice.call(
			(container || document).querySelectorAll(selector)
		)
	}

	/**
	 * Returns whether the given element has the given class.
	 *
	 * @param {Element} element
	 * @param {string} className
	 * @returns {boolean}
	 */
	function hasClass(element, className) {
		return element.classList.contains(className)
	}

	/**
	 * Calls the given function.
	 *
	 * @param {() => any} func
	 * @returns {void}
	 */
	function callFunction(func) {
		func()
	}

	// Some browsers round the line-height, others don't.
	// We need to test for it to position the elements properly.
	var isLineHeightRounded = (function () {
		var res
		return function () {
			if (typeof res === 'undefined') {
				var d = document.createElement('div')
				d.style.fontSize = '13px'
				d.style.lineHeight = '1.5'
				d.style.padding = '0'
				d.style.border = '0'
				d.innerHTML = '&nbsp;<br />&nbsp;'
				document.body.appendChild(d)
				// Browsers that round the line-height should have offsetHeight === 38
				// The others should have 39.
				res = d.offsetHeight === 38
				document.body.removeChild(d)
			}
			return res
		}
	})()

	/**
	 * Returns the top offset of the content box of the given parent and the content box of one of its children.
	 *
	 * @param {HTMLElement} parent
	 * @param {HTMLElement} child
	 */
	function getContentBoxTopOffset(parent, child) {
		var parentStyle = getComputedStyle(parent)
		var childStyle = getComputedStyle(child)

		/**
		 * Returns the numeric value of the given pixel value.
		 *
		 * @param {string} px
		 */
		function pxToNumber(px) {
			return +px.substr(0, px.length - 2)
		}

		return (
			child.offsetTop +
			pxToNumber(childStyle.borderTopWidth) +
			pxToNumber(childStyle.paddingTop) -
			pxToNumber(parentStyle.paddingTop)
		)
	}

	/**
	 * Returns whether the Line Highlight plugin is active for the given element.
	 *
	 * If this function returns `false`, do not call `highlightLines` for the given element.
	 *
	 * @param {HTMLElement | null | undefined} pre
	 * @returns {boolean}
	 */
	function isActiveFor(pre) {
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return false
		}

		if (pre.hasAttribute('data-line')) {
			return true
		}

		if (pre.id && Prism.util.isActive(pre, LINKABLE_LINE_NUMBERS_CLASS)) {
			// Technically, the line numbers plugin is also necessary but this plugin doesn't control the classes of
			// the line numbers plugin, so we can't assume that they are present.
			return true
		}

		return false
	}

	var scrollIntoView = true

	Prism.plugins.lineHighlight = {
		/**
		 * Highlights the lines of the given pre.
		 *
		 * This function is split into a DOM measuring and mutate phase to improve performance.
		 * The returned function mutates the DOM when called.
		 *
		 * @param {HTMLElement} pre
		 * @param {string | null} [lines]
		 * @param {string} [classes='']
		 * @returns {() => void}
		 */
		highlightLines: function highlightLines(pre, lines, classes) {
			lines =
				typeof lines === 'string'
					? lines
					: pre.getAttribute('data-line') || ''

			var ranges = lines.replace(/\s+/g, '').split(',').filter(Boolean)
			var offset = +pre.getAttribute('data-line-offset') || 0

			var parseMethod = isLineHeightRounded() ? parseInt : parseFloat
			var lineHeight = parseMethod(getComputedStyle(pre).lineHeight)
			var hasLineNumbers = Prism.util.isActive(pre, LINE_NUMBERS_CLASS)
			var codeElement = pre.querySelector('code')
			var parentElement = hasLineNumbers ? pre : codeElement || pre
			var mutateActions = /** @type {(() => void)[]} */ ([])

			/**
			 * The top offset between the content box of the <code> element and the content box of the parent element of
			 * the line highlight element (either `<pre>` or `<code>`).
			 *
			 * This offset might not be zero for some themes where the <code> element has a top margin. Some plugins
			 * (or users) might also add element above the <code> element. Because the line highlight is aligned relative
			 * to the <pre> element, we have to take this into account.
			 *
			 * This offset will be 0 if the parent element of the line highlight element is the `<code>` element.
			 */
			var codePreOffset =
				!codeElement || parentElement == codeElement
					? 0
					: getContentBoxTopOffset(pre, codeElement)

			ranges.forEach(function (currentRange) {
				var range = currentRange.split('-')

				var start = +range[0]
				var end = +range[1] || start

				/** @type {HTMLElement} */
				var line =
					pre.querySelector(
						'.line-highlight[data-range="' + currentRange + '"]'
					) || document.createElement('div')

				mutateActions.push(function () {
					line.setAttribute('aria-hidden', 'true')
					line.setAttribute('data-range', currentRange)
					line.className = (classes || '') + ' line-highlight'
				})

				// if the line-numbers plugin is enabled, then there is no reason for this plugin to display the line numbers
				if (hasLineNumbers && Prism.plugins.lineNumbers) {
					var startNode = Prism.plugins.lineNumbers.getLine(
						pre,
						start
					)
					var endNode = Prism.plugins.lineNumbers.getLine(pre, end)

					if (startNode) {
						var top = startNode.offsetTop + codePreOffset + 'px'
						mutateActions.push(function () {
							line.style.top = top
						})
					}

					if (endNode) {
						var height =
							endNode.offsetTop -
							startNode.offsetTop +
							endNode.offsetHeight +
							'px'
						mutateActions.push(function () {
							line.style.height = height
						})
					}
				} else {
					mutateActions.push(function () {
						line.setAttribute('data-start', String(start))

						if (end > start) {
							line.setAttribute('data-end', String(end))
						}

						line.style.top =
							(start - offset - 1) * lineHeight +
							codePreOffset +
							'px'

						line.textContent = new Array(end - start + 2).join(
							' \n'
						)
					})
				}

				mutateActions.push(function () {
					line.style.width = pre.scrollWidth + 'px'
				})

				mutateActions.push(function () {
					// allow this to play nicely with the line-numbers plugin
					// need to attack to pre as when line-numbers is enabled, the code tag is relatively which screws up the positioning
					parentElement.appendChild(line)
				})
			})

			var id = pre.id
			if (
				hasLineNumbers &&
				Prism.util.isActive(pre, LINKABLE_LINE_NUMBERS_CLASS) &&
				id
			) {
				// This implements linkable line numbers. Linkable line numbers use Line Highlight to create a link to a
				// specific line. For this to work, the pre element has to:
				//  1) have line numbers,
				//  2) have the `linkable-line-numbers` class or an ascendant that has that class, and
				//  3) have an id.

				if (!hasClass(pre, LINKABLE_LINE_NUMBERS_CLASS)) {
					// add class to pre
					mutateActions.push(function () {
						pre.classList.add(LINKABLE_LINE_NUMBERS_CLASS)
					})
				}

				var start = parseInt(pre.getAttribute('data-start') || '1')

				// iterate all line number spans
				$$('.line-numbers-rows > span', pre).forEach(function (
					lineSpan,
					i
				) {
					var lineNumber = i + start
					lineSpan.onclick = function () {
						var hash = id + '.' + lineNumber

						// this will prevent scrolling since the span is obviously in view
						scrollIntoView = false
						location.hash = hash
						setTimeout(function () {
							scrollIntoView = true
						}, 1)
					}
				})
			}

			return function () {
				mutateActions.forEach(callFunction)
			}
		},
	}

	function applyHash() {
		var hash = location.hash.slice(1)

		// Remove pre-existing temporary lines
		$$('.temporary.line-highlight').forEach(function (line) {
			line.parentNode.removeChild(line)
		})

		var range = (hash.match(/\.([\d,-]+)$/) || [, ''])[1]

		if (!range || document.getElementById(hash)) {
			return
		}

		var id = hash.slice(0, hash.lastIndexOf('.'))
		var pre = document.getElementById(id)

		if (!pre) {
			return
		}

		if (!pre.hasAttribute('data-line')) {
			pre.setAttribute('data-line', '')
		}

		var mutateDom = Prism.plugins.lineHighlight.highlightLines(
			pre,
			range,
			'temporary '
		)
		mutateDom()

		if (scrollIntoView) {
			document.querySelector('.temporary.line-highlight').scrollIntoView()
		}
	}

	var fakeTimer = 0 // Hack to limit the number of times applyHash() runs

	Prism.hooks.add('before-sanity-check', function (env) {
		var pre = env.element.parentElement
		if (!isActiveFor(pre)) {
			return
		}

		/*
		 * Cleanup for other plugins (e.g. autoloader).
		 *
		 * Sometimes <code> blocks are highlighted multiple times. It is necessary
		 * to cleanup any left-over tags, because the whitespace inside of the <div>
		 * tags change the content of the <code> tag.
		 */
		var num = 0
		$$('.line-highlight', pre).forEach(function (line) {
			num += line.textContent.length
			line.parentNode.removeChild(line)
		})
		// Remove extra whitespace
		if (num && /^(?: \n)+$/.test(env.code.slice(-num))) {
			env.code = env.code.slice(0, -num)
		}
	})

	Prism.hooks.add('complete', function completeHook(env) {
		var pre = env.element.parentElement
		if (!isActiveFor(pre)) {
			return
		}

		clearTimeout(fakeTimer)

		var hasLineNumbers = Prism.plugins.lineNumbers
		var isLineNumbersLoaded = env.plugins && env.plugins.lineNumbers

		if (
			hasClass(pre, LINE_NUMBERS_CLASS) &&
			hasLineNumbers &&
			!isLineNumbersLoaded
		) {
			Prism.hooks.add('line-numbers', completeHook)
		} else {
			var mutateDom = Prism.plugins.lineHighlight.highlightLines(pre)
			mutateDom()
			fakeTimer = setTimeout(applyHash, 1)
		}
	})

	window.addEventListener('hashchange', applyHash)
	window.addEventListener('resize', function () {
		var actions = $$('pre')
			.filter(isActiveFor)
			.map(function (pre) {
				return Prism.plugins.lineHighlight.highlightLines(pre)
			})
		actions.forEach(callFunction)
	})
})()

;(function () {
	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return
	}

	/**
	 * Plugin name which is used as a class name for <pre> which is activating the plugin
	 *
	 * @type {string}
	 */
	var PLUGIN_NAME = 'line-numbers'

	/**
	 * Regular expression used for determining line breaks
	 *
	 * @type {RegExp}
	 */
	var NEW_LINE_EXP = /\n(?!$)/g

	/**
	 * Global exports
	 */
	var config = (Prism.plugins.lineNumbers = {
		/**
		 * Get node for provided line number
		 *
		 * @param {Element} element pre element
		 * @param {number} number line number
		 * @returns {Element|undefined}
		 */
		getLine: function (element, number) {
			if (
				element.tagName !== 'PRE' ||
				!element.classList.contains(PLUGIN_NAME)
			) {
				return
			}

			var lineNumberRows = element.querySelector('.line-numbers-rows')
			if (!lineNumberRows) {
				return
			}
			var lineNumberStart =
				parseInt(element.getAttribute('data-start'), 10) || 1
			var lineNumberEnd =
				lineNumberStart + (lineNumberRows.children.length - 1)

			if (number < lineNumberStart) {
				number = lineNumberStart
			}
			if (number > lineNumberEnd) {
				number = lineNumberEnd
			}

			var lineIndex = number - lineNumberStart

			return lineNumberRows.children[lineIndex]
		},

		/**
		 * Resizes the line numbers of the given element.
		 *
		 * This function will not add line numbers. It will only resize existing ones.
		 *
		 * @param {HTMLElement} element A `<pre>` element with line numbers.
		 * @returns {void}
		 */
		resize: function (element) {
			resizeElements([element])
		},

		/**
		 * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
		 * the current viewport.
		 *
		 * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
		 *
		 * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
		 *
		 * @type {boolean}
		 */
		assumeViewportIndependence: true,
	})

	/**
	 * Resizes the given elements.
	 *
	 * @param {HTMLElement[]} elements
	 */
	function resizeElements(elements) {
		elements = elements.filter(function (e) {
			var codeStyles = getStyles(e)
			var whiteSpace = codeStyles['white-space']
			return whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line'
		})

		if (elements.length == 0) {
			return
		}

		var infos = elements
			.map(function (element) {
				var codeElement = element.querySelector('code')
				var lineNumbersWrapper =
					element.querySelector('.line-numbers-rows')
				if (!codeElement || !lineNumbersWrapper) {
					return undefined
				}

				/** @type {HTMLElement} */
				var lineNumberSizer = element.querySelector(
					'.line-numbers-sizer'
				)
				var codeLines = codeElement.textContent.split(NEW_LINE_EXP)

				if (!lineNumberSizer) {
					lineNumberSizer = document.createElement('span')
					lineNumberSizer.className = 'line-numbers-sizer'

					codeElement.appendChild(lineNumberSizer)
				}

				lineNumberSizer.innerHTML = '0'
				lineNumberSizer.style.display = 'block'

				var oneLinerHeight =
					lineNumberSizer.getBoundingClientRect().height
				lineNumberSizer.innerHTML = ''

				return {
					element: element,
					lines: codeLines,
					lineHeights: [],
					oneLinerHeight: oneLinerHeight,
					sizer: lineNumberSizer,
				}
			})
			.filter(Boolean)

		infos.forEach(function (info) {
			var lineNumberSizer = info.sizer
			var lines = info.lines
			var lineHeights = info.lineHeights
			var oneLinerHeight = info.oneLinerHeight

			lineHeights[lines.length - 1] = undefined
			lines.forEach(function (line, index) {
				if (line && line.length > 1) {
					var e = lineNumberSizer.appendChild(
						document.createElement('span')
					)
					e.style.display = 'block'
					e.textContent = line
				} else {
					lineHeights[index] = oneLinerHeight
				}
			})
		})

		infos.forEach(function (info) {
			var lineNumberSizer = info.sizer
			var lineHeights = info.lineHeights

			var childIndex = 0
			for (var i = 0; i < lineHeights.length; i++) {
				if (lineHeights[i] === undefined) {
					lineHeights[i] =
						lineNumberSizer.children[
							childIndex++
						].getBoundingClientRect().height
				}
			}
		})

		infos.forEach(function (info) {
			var lineNumberSizer = info.sizer
			var wrapper = info.element.querySelector('.line-numbers-rows')

			lineNumberSizer.style.display = 'none'
			lineNumberSizer.innerHTML = ''

			info.lineHeights.forEach(function (height, lineNumber) {
				wrapper.children[lineNumber].style.height = height + 'px'
			})
		})
	}

	/**
	 * Returns style declarations for the element
	 *
	 * @param {Element} element
	 */
	function getStyles(element) {
		if (!element) {
			return null
		}

		return window.getComputedStyle
			? getComputedStyle(element)
			: element.currentStyle || null
	}

	var lastWidth = undefined
	window.addEventListener('resize', function () {
		if (
			config.assumeViewportIndependence &&
			lastWidth === window.innerWidth
		) {
			return
		}
		lastWidth = window.innerWidth

		resizeElements(
			Array.prototype.slice.call(
				document.querySelectorAll('pre.' + PLUGIN_NAME)
			)
		)
	})

	Prism.hooks.add('complete', function (env) {
		if (!env.code) {
			return
		}

		var code = /** @type {Element} */ (env.element)
		var pre = /** @type {HTMLElement} */ (code.parentNode)

		// works only for <code> wrapped inside <pre> (not inline)
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return
		}

		// Abort if line numbers already exists
		if (code.querySelector('.line-numbers-rows')) {
			return
		}

		// only add line numbers if <code> or one of its ancestors has the `line-numbers` class
		if (!Prism.util.isActive(code, PLUGIN_NAME)) {
			return
		}

		// Remove the class 'line-numbers' from the <code>
		code.classList.remove(PLUGIN_NAME)
		// Add the class 'line-numbers' to the <pre>
		pre.classList.add(PLUGIN_NAME)

		var match = env.code.match(NEW_LINE_EXP)
		var linesNum = match ? match.length + 1 : 1
		var lineNumbersWrapper

		var lines = new Array(linesNum + 1).join('<span></span>')

		lineNumbersWrapper = document.createElement('span')
		lineNumbersWrapper.setAttribute('aria-hidden', 'true')
		lineNumbersWrapper.className = 'line-numbers-rows'
		lineNumbersWrapper.innerHTML = lines

		if (pre.hasAttribute('data-start')) {
			pre.style.counterReset =
				'linenumber ' +
				(parseInt(pre.getAttribute('data-start'), 10) - 1)
		}

		env.element.appendChild(lineNumbersWrapper)

		resizeElements([pre])

		Prism.hooks.run('line-numbers', env)
	})

	Prism.hooks.add('line-numbers', function (env) {
		env.plugins = env.plugins || {}
		env.plugins.lineNumbers = true
	})
})()

;(function () {
	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.msMatchesSelector ||
			Element.prototype.webkitMatchesSelector
	}

	var LOADING_MESSAGE = 'Loading…'
	var FAILURE_MESSAGE = function (status, message) {
		return '✖ Error ' + status + ' while fetching file: ' + message
	}
	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty'

	var EXTENSIONS = {
		js: 'javascript',
		py: 'python',
		rb: 'ruby',
		ps1: 'powershell',
		psm1: 'powershell',
		sh: 'bash',
		bat: 'batch',
		h: 'c',
		tex: 'latex',
	}

	var STATUS_ATTR = 'data-src-status'
	var STATUS_LOADING = 'loading'
	var STATUS_LOADED = 'loaded'
	var STATUS_FAILED = 'failed'

	var SELECTOR =
		'pre[data-src]:not([' +
		STATUS_ATTR +
		'="' +
		STATUS_LOADED +
		'"])' +
		':not([' +
		STATUS_ATTR +
		'="' +
		STATUS_LOADING +
		'"])'

	/**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */
	function loadFile(src, success, error) {
		var xhr = new XMLHttpRequest()
		xhr.open('GET', src, true)
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status < 400 && xhr.responseText) {
					success(xhr.responseText)
				} else {
					if (xhr.status >= 400) {
						error(FAILURE_MESSAGE(xhr.status, xhr.statusText))
					} else {
						error(FAILURE_EMPTY_MESSAGE)
					}
				}
			}
		}
		xhr.send(null)
	}

	/**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */
	function parseRange(range) {
		var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '')
		if (m) {
			var start = Number(m[1])
			var comma = m[2]
			var end = m[3]

			if (!comma) {
				return [start, start]
			}
			if (!end) {
				return [start, undefined]
			}
			return [start, Number(end)]
		}
		return undefined
	}

	Prism.hooks.add('before-highlightall', function (env) {
		env.selector += ', ' + SELECTOR
	})

	Prism.hooks.add('before-sanity-check', function (env) {
		var pre = /** @type {HTMLPreElement} */ (env.element)
		if (pre.matches(SELECTOR)) {
			env.code = '' // fast-path the whole thing and go to complete

			pre.setAttribute(STATUS_ATTR, STATUS_LOADING) // mark as loading

			// add code element with loading message
			var code = pre.appendChild(document.createElement('CODE'))
			code.textContent = LOADING_MESSAGE

			var src = pre.getAttribute('data-src')

			var language = env.language
			if (language === 'none') {
				// the language might be 'none' because there is no language set;
				// in this case, we want to use the extension as the language
				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1]
				language = EXTENSIONS[extension] || extension
			}

			// set language classes
			Prism.util.setLanguage(code, language)
			Prism.util.setLanguage(pre, language)

			// preload the language
			var autoloader = Prism.plugins.autoloader
			if (autoloader) {
				autoloader.loadLanguages(language)
			}

			// load file
			loadFile(
				src,
				function (text) {
					// mark as loaded
					pre.setAttribute(STATUS_ATTR, STATUS_LOADED)

					// handle data-range
					var range = parseRange(pre.getAttribute('data-range'))
					if (range) {
						var lines = text.split(/\r\n?|\n/g)

						// the range is one-based and inclusive on both ends
						var start = range[0]
						var end = range[1] == null ? lines.length : range[1]

						if (start < 0) {
							start += lines.length
						}
						start = Math.max(0, Math.min(start - 1, lines.length))
						if (end < 0) {
							end += lines.length
						}
						end = Math.max(0, Math.min(end, lines.length))

						text = lines.slice(start, end).join('\n')

						// add data-start for line numbers
						if (!pre.hasAttribute('data-start')) {
							pre.setAttribute('data-start', String(start + 1))
						}
					}

					// highlight code
					code.textContent = text
					Prism.highlightElement(code)
				},
				function (error) {
					// mark as failed
					pre.setAttribute(STATUS_ATTR, STATUS_FAILED)

					code.textContent = error
				}
			)
		}
	})

	Prism.plugins.fileHighlight = {
		/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */
		highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR)

			for (var i = 0, element; (element = elements[i++]); ) {
				Prism.highlightElement(element)
			}
		},
	}

	var logged = false
	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
	Prism.fileHighlight = function () {
		if (!logged) {
			console.warn(
				'Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.'
			)
			logged = true
		}
		Prism.plugins.fileHighlight.highlight.apply(this, arguments)
	}
})()

;(function () {
	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return
	}

	var CLASS_PATTERN = /(?:^|\s)command-line(?:\s|$)/
	var PROMPT_CLASS = 'command-line-prompt'

	/** @type {(str: string, prefix: string) => boolean} */
	var startsWith = ''.startsWith
		? function (s, p) {
				return s.startsWith(p)
		  }
		: function (s, p) {
				return s.indexOf(p) === 0
		  }

	// Support for IE11 that has no endsWith()
	/** @type {(str: string, suffix: string) => boolean} */
	var endsWith = ''.endsWith
		? function (str, suffix) {
				return str.endsWith(suffix)
		  }
		: function (str, suffix) {
				var len = str.length
				return str.substring(len - suffix.length, len) === suffix
		  }

	/**
	 * Returns whether the given hook environment has a command line info object.
	 *
	 * @param {any} env
	 * @returns {boolean}
	 */
	function hasCommandLineInfo(env) {
		var vars = (env.vars = env.vars || {})
		return 'command-line' in vars
	}
	/**
	 * Returns the command line info object from the given hook environment.
	 *
	 * @param {any} env
	 * @returns {CommandLineInfo}
	 *
	 * @typedef CommandLineInfo
	 * @property {boolean} [complete]
	 * @property {number} [numberOfLines]
	 * @property {string[]} [outputLines]
	 */
	function getCommandLineInfo(env) {
		var vars = (env.vars = env.vars || {})
		return (vars['command-line'] = vars['command-line'] || {})
	}

	Prism.hooks.add('before-highlight', function (env) {
		var commandLine = getCommandLineInfo(env)

		if (commandLine.complete || !env.code) {
			commandLine.complete = true
			return
		}

		// Works only for <code> wrapped inside <pre> (not inline).
		var pre = env.element.parentElement
		if (
			!pre ||
			!/pre/i.test(pre.nodeName) || // Abort only if neither the <pre> nor the <code> have the class
			(!CLASS_PATTERN.test(pre.className) &&
				!CLASS_PATTERN.test(env.element.className))
		) {
			commandLine.complete = true
			return
		}

		// The element might be highlighted multiple times, so we just remove the previous prompt
		var existingPrompt = env.element.querySelector('.' + PROMPT_CLASS)
		if (existingPrompt) {
			existingPrompt.remove()
		}

		var codeLines = env.code.split('\n')

		commandLine.numberOfLines = codeLines.length
		/** @type {string[]} */
		var outputLines = (commandLine.outputLines = [])

		var outputSections = pre.getAttribute('data-output')
		var outputFilter = pre.getAttribute('data-filter-output')
		if (outputSections !== null) {
			// The user specified the output lines. -- cwells
			outputSections.split(',').forEach(function (section) {
				var range = section.split('-')
				var outputStart = parseInt(range[0], 10)
				var outputEnd =
					range.length === 2 ? parseInt(range[1], 10) : outputStart

				if (!isNaN(outputStart) && !isNaN(outputEnd)) {
					if (outputStart < 1) {
						outputStart = 1
					}
					if (outputEnd > codeLines.length) {
						outputEnd = codeLines.length
					}
					// Convert start and end to 0-based to simplify the arrays. -- cwells
					outputStart--
					outputEnd--
					// Save the output line in an array and clear it in the code so it's not highlighted. -- cwells
					for (var j = outputStart; j <= outputEnd; j++) {
						outputLines[j] = codeLines[j]
						codeLines[j] = ''
					}
				}
			})
		} else if (outputFilter) {
			// Treat lines beginning with this string as output. -- cwells
			for (var i = 0; i < codeLines.length; i++) {
				if (startsWith(codeLines[i], outputFilter)) {
					// This line is output. -- cwells
					outputLines[i] = codeLines[i].slice(outputFilter.length)
					codeLines[i] = ''
				}
			}
		}

		var continuationLineIndicies = (commandLine.continuationLineIndicies =
			new Set())
		var lineContinuationStr = pre.getAttribute('data-continuation-str')
		var continuationFilter = pre.getAttribute('data-filter-continuation')

		// Identify code lines where the command has continued onto subsequent
		// lines and thus need a different prompt. Need to do this after the output
		// lines have been removed to ensure we don't pick up a continuation string
		// in an output line.
		for (var j = 0; j < codeLines.length; j++) {
			var line = codeLines[j]
			if (!line) {
				continue
			}

			// Record the next line as a continuation if this one ends in a continuation str.
			if (lineContinuationStr && endsWith(line, lineContinuationStr)) {
				continuationLineIndicies.add(j + 1)
			}
			// Record this line as a continuation if marked with a continuation prefix
			// (that we will remove).
			if (
				j > 0 &&
				continuationFilter &&
				startsWith(line, continuationFilter)
			) {
				codeLines[j] = line.slice(continuationFilter.length)
				continuationLineIndicies.add(j)
			}
		}

		env.code = codeLines.join('\n')
	})

	Prism.hooks.add('before-insert', function (env) {
		var commandLine = getCommandLineInfo(env)

		if (commandLine.complete) {
			return
		}

		// Reinsert the output lines into the highlighted code. -- cwells
		var codeLines = env.highlightedCode.split('\n')
		var outputLines = commandLine.outputLines || []
		for (var i = 0, l = codeLines.length; i < l; i++) {
			// Add spans to allow distinction of input/output text for styling
			if (outputLines.hasOwnProperty(i)) {
				// outputLines were removed from codeLines so missed out on escaping
				// of markup so do it here.
				codeLines[i] =
					'<span class="token output">' +
					Prism.util.encode(outputLines[i]) +
					'</span>'
			} else {
				codeLines[i] =
					'<span class="token command">' + codeLines[i] + '</span>'
			}
		}
		env.highlightedCode = codeLines.join('\n')
	})

	Prism.hooks.add('complete', function (env) {
		if (!hasCommandLineInfo(env)) {
			// the previous hooks never ran
			return
		}

		var commandLine = getCommandLineInfo(env)

		if (commandLine.complete) {
			return
		}

		var pre = env.element.parentElement
		if (CLASS_PATTERN.test(env.element.className)) {
			// Remove the class "command-line" from the <code>
			env.element.className = env.element.className.replace(
				CLASS_PATTERN,
				' '
			)
		}
		if (!CLASS_PATTERN.test(pre.className)) {
			// Add the class "command-line" to the <pre>
			pre.className += ' command-line'
		}

		function getAttribute(key, defaultValue) {
			return (pre.getAttribute(key) || defaultValue).replace(
				/"/g,
				'&quot'
			)
		}

		// Create the "rows" that will become the command-line prompts. -- cwells
		var promptLines = ''
		var rowCount = commandLine.numberOfLines || 0
		var promptText = getAttribute('data-prompt', '')
		var promptLine
		if (promptText !== '') {
			promptLine = '<span data-prompt="' + promptText + '"></span>'
		} else {
			var user = getAttribute('data-user', 'user')
			var host = getAttribute('data-host', 'localhost')
			promptLine =
				'<span data-user="' +
				user +
				'" data-host="' +
				host +
				'"></span>'
		}

		var continuationLineIndicies =
			commandLine.continuationLineIndicies || new Set()
		var continuationPromptText = getAttribute(
			'data-continuation-prompt',
			'>'
		)
		var continuationPromptLine =
			'<span data-continuation-prompt="' +
			continuationPromptText +
			'"></span>'

		// Assemble all the appropriate prompt/continuation lines
		for (var j = 0; j < rowCount; j++) {
			if (continuationLineIndicies.has(j)) {
				promptLines += continuationPromptLine
			} else {
				promptLines += promptLine
			}
		}

		// Create the wrapper element. -- cwells
		var prompt = document.createElement('span')
		prompt.className = PROMPT_CLASS
		prompt.innerHTML = promptLines

		// Remove the prompt from the output lines. -- cwells
		var outputLines = commandLine.outputLines || []
		for (var i = 0, l = outputLines.length; i < l; i++) {
			if (outputLines.hasOwnProperty(i)) {
				var node = prompt.children[i]
				node.removeAttribute('data-user')
				node.removeAttribute('data-host')
				node.removeAttribute('data-prompt')
			}
		}

		env.element.insertBefore(prompt, env.element.firstChild)
		commandLine.complete = true
	})
})()

;(function () {
	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return
	}

	var callbacks = []
	var map = {}
	var noop = function () {}

	Prism.plugins.toolbar = {}

	/**
	 * @typedef ButtonOptions
	 * @property {string} text The text displayed.
	 * @property {string} [url] The URL of the link which will be created.
	 * @property {Function} [onClick] The event listener for the `click` event of the created button.
	 * @property {string} [className] The class attribute to include with element.
	 */

	/**
	 * Register a button callback with the toolbar.
	 *
	 * @param {string} key
	 * @param {ButtonOptions|Function} opts
	 */
	var registerButton = (Prism.plugins.toolbar.registerButton = function (
		key,
		opts
	) {
		var callback

		if (typeof opts === 'function') {
			callback = opts
		} else {
			callback = function (env) {
				var element

				if (typeof opts.onClick === 'function') {
					element = document.createElement('button')
					element.type = 'button'
					element.addEventListener('click', function () {
						opts.onClick.call(this, env)
					})
				} else if (typeof opts.url === 'string') {
					element = document.createElement('a')
					element.href = opts.url
				} else {
					element = document.createElement('span')
				}

				if (opts.className) {
					element.classList.add(opts.className)
				}

				element.textContent = opts.text

				return element
			}
		}

		if (key in map) {
			console.warn(
				'There is a button with the key "' +
					key +
					'" registered already.'
			)
			return
		}

		callbacks.push((map[key] = callback))
	})

	/**
	 * Returns the callback order of the given element.
	 *
	 * @param {HTMLElement} element
	 * @returns {string[] | undefined}
	 */
	function getOrder(element) {
		while (element) {
			var order = element.getAttribute('data-toolbar-order')
			if (order != null) {
				order = order.trim()
				if (order.length) {
					return order.split(/\s*,\s*/g)
				} else {
					return []
				}
			}
			element = element.parentElement
		}
	}

	/**
	 * Post-highlight Prism hook callback.
	 *
	 * @param env
	 */
	var hook = (Prism.plugins.toolbar.hook = function (env) {
		// Check if inline or actual code block (credit to line-numbers plugin)
		var pre = env.element.parentNode
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return
		}

		// Autoloader rehighlights, so only do this once.
		if (pre.parentNode.classList.contains('code-toolbar')) {
			return
		}

		// Create wrapper for <pre> to prevent scrolling toolbar with content
		var wrapper = document.createElement('div')
		wrapper.classList.add('code-toolbar')
		pre.parentNode.insertBefore(wrapper, pre)
		wrapper.appendChild(pre)

		// Setup the toolbar
		var toolbar = document.createElement('div')
		toolbar.classList.add('toolbar')

		// order callbacks
		var elementCallbacks = callbacks
		var order = getOrder(env.element)
		if (order) {
			elementCallbacks = order.map(function (key) {
				return map[key] || noop
			})
		}

		elementCallbacks.forEach(function (callback) {
			var element = callback(env)

			if (!element) {
				return
			}

			var item = document.createElement('div')
			item.classList.add('toolbar-item')

			item.appendChild(element)
			toolbar.appendChild(item)
		})

		// Add our toolbar to the currently created wrapper of <pre> tag
		wrapper.appendChild(toolbar)
	})

	registerButton('label', function (env) {
		var pre = env.element.parentNode
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return
		}

		if (!pre.hasAttribute('data-label')) {
			return
		}

		var element
		var template
		var text = pre.getAttribute('data-label')
		try {
			// Any normal text will blow up this selector.
			template = document.querySelector('template#' + text)
		} catch (e) {
			/* noop */
		}

		if (template) {
			element = template.content
		} else {
			if (pre.hasAttribute('data-url')) {
				element = document.createElement('a')
				element.href = pre.getAttribute('data-url')
			} else {
				element = document.createElement('span')
			}

			element.textContent = text
		}

		return element
	})

	/**
	 * Register the toolbar with Prism.
	 */
	Prism.hooks.add('complete', hook)
})()

;(function () {
	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return
	}

	if (!Prism.plugins.toolbar) {
		console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.')

		return
	}

	/**
	 * When the given elements is clicked by the user, the given text will be copied to clipboard.
	 *
	 * @param {HTMLElement} element
	 * @param {CopyInfo} copyInfo
	 *
	 * @typedef CopyInfo
	 * @property {() => string} getText
	 * @property {() => void} success
	 * @property {(reason: unknown) => void} error
	 */
	function registerClipboard(element, copyInfo) {
		element.addEventListener('click', function () {
			copyTextToClipboard(copyInfo)
		})
	}

	// https://stackoverflow.com/a/30810322/7595472

	/** @param {CopyInfo} copyInfo */
	function fallbackCopyTextToClipboard(copyInfo) {
		var textArea = document.createElement('textarea')
		textArea.value = copyInfo.getText()

		// Avoid scrolling to bottom
		textArea.style.top = '0'
		textArea.style.left = '0'
		textArea.style.position = 'fixed'

		document.body.appendChild(textArea)
		textArea.focus()
		textArea.select()

		try {
			var successful = document.execCommand('copy')
			setTimeout(function () {
				if (successful) {
					copyInfo.success()
				} else {
					copyInfo.error()
				}
			}, 1)
		} catch (err) {
			setTimeout(function () {
				copyInfo.error(err)
			}, 1)
		}

		document.body.removeChild(textArea)
	}
	/** @param {CopyInfo} copyInfo */
	function copyTextToClipboard(copyInfo) {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(copyInfo.getText())
				.then(copyInfo.success, function () {
					// try the fallback in case `writeText` didn't work
					fallbackCopyTextToClipboard(copyInfo)
				})
		} else {
			fallbackCopyTextToClipboard(copyInfo)
		}
	}

	/**
	 * Selects the text content of the given element.
	 *
	 * @param {Element} element
	 */
	function selectElementText(element) {
		// https://stackoverflow.com/a/20079910/7595472
		window.getSelection().selectAllChildren(element)
	}

	/**
	 * Traverses up the DOM tree to find data attributes that override the default plugin settings.
	 *
	 * @param {Element} startElement An element to start from.
	 * @returns {Settings} The plugin settings.
	 * @typedef {Record<"copy" | "copy-error" | "copy-success" | "copy-timeout", string | number>} Settings
	 */
	function getSettings(startElement) {
		/** @type {Settings} */
		var settings = {
			copy: 'Copy',
			'copy-error': 'Press Ctrl+C to copy',
			'copy-success': 'Copied!',
			'copy-timeout': 5000,
		}

		var prefix = 'data-prismjs-'
		for (var key in settings) {
			var attr = prefix + key
			var element = startElement
			while (element && !element.hasAttribute(attr)) {
				element = element.parentElement
			}
			if (element) {
				settings[key] = element.getAttribute(attr)
			}
		}
		return settings
	}

	Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (env) {
		var element = env.element

		var settings = getSettings(element)

		var linkCopy = document.createElement('button')
		linkCopy.className = 'copy-to-clipboard-button'
		linkCopy.setAttribute('type', 'button')
		var linkSpan = document.createElement('span')
		linkCopy.appendChild(linkSpan)

		setState('copy')

		registerClipboard(linkCopy, {
			getText: function () {
				return element.textContent
			},
			success: function () {
				setState('copy-success')

				resetText()
			},
			error: function () {
				setState('copy-error')

				setTimeout(function () {
					selectElementText(element)
				}, 1)

				resetText()
			},
		})

		return linkCopy

		function resetText() {
			setTimeout(function () {
				setState('copy')
			}, settings['copy-timeout'])
		}

		/** @param {"copy" | "copy-error" | "copy-success"} state */
		function setState(state) {
			linkSpan.textContent = settings[state]
			linkCopy.setAttribute('data-copy-state', state)
		}
	})
})()

;(function () {
	if (typeof Prism === 'undefined') {
		return
	}

	var LANGUAGE_REGEX = /^diff-([\w-]+)/i
	var HTML_TAG =
		/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g
	//this will match a line plus the line break while ignoring the line breaks HTML tags may contain.
	var HTML_LINE = RegExp(
		/(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))/.source.replace(
			/__/g,
			function () {
				return HTML_TAG.source
			}
		),
		'gi'
	)

	var warningLogged = false

	Prism.hooks.add('before-sanity-check', function (env) {
		var lang = env.language
		if (LANGUAGE_REGEX.test(lang) && !env.grammar) {
			env.grammar = Prism.languages[lang] = Prism.languages.diff
		}
	})
	Prism.hooks.add('before-tokenize', function (env) {
		if (
			!warningLogged &&
			!Prism.languages.diff &&
			!Prism.plugins.autoloader
		) {
			warningLogged = true
			console.warn(
				"Prism's Diff Highlight plugin requires the Diff language definition (prism-diff.js)." +
					"Make sure the language definition is loaded or use Prism's Autoloader plugin."
			)
		}

		var lang = env.language
		if (LANGUAGE_REGEX.test(lang) && !Prism.languages[lang]) {
			Prism.languages[lang] = Prism.languages.diff
		}
	})

	Prism.hooks.add('wrap', function (env) {
		var diffLanguage
		var diffGrammar

		if (env.language !== 'diff') {
			var langMatch = LANGUAGE_REGEX.exec(env.language)
			if (!langMatch) {
				return // not a language specific diff
			}

			diffLanguage = langMatch[1]
			diffGrammar = Prism.languages[diffLanguage]
		}

		var PREFIXES = Prism.languages.diff && Prism.languages.diff.PREFIXES

		// one of the diff tokens without any nested tokens
		if (PREFIXES && env.type in PREFIXES) {
			/** @type {string} */
			var content = env.content.replace(HTML_TAG, '') // remove all HTML tags

			/** @type {string} */
			var decoded = content.replace(/&lt;/g, '<').replace(/&amp;/g, '&')

			// remove any one-character prefix
			var code = decoded.replace(/(^|[\r\n])./g, '$1')

			// highlight, if possible
			var highlighted
			if (diffGrammar) {
				highlighted = Prism.highlight(code, diffGrammar, diffLanguage)
			} else {
				highlighted = Prism.util.encode(code)
			}

			// get the HTML source of the prefix token
			var prefixToken = new Prism.Token('prefix', PREFIXES[env.type], [
				/\w+/.exec(env.type)[0],
			])
			var prefix = Prism.Token.stringify(prefixToken, env.language)

			// add prefix
			var lines = []
			var m
			HTML_LINE.lastIndex = 0
			while ((m = HTML_LINE.exec(highlighted))) {
				lines.push(prefix + m[0])
			}
			if (/(?:^|[\r\n]).$/.test(decoded)) {
				// because both "+a\n+" and "+a\n" will map to "a\n" after the line prefixes are removed
				lines.push(prefix)
			}
			env.content = lines.join('')

			if (diffGrammar) {
				env.classes.push('language-' + diffLanguage)
			}
		}
	})
})()
