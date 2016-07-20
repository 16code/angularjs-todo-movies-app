module.exports = {
    rules: {
        // 强制getter/setter成对出现在对象中
        'accessor-pairs': 0,
        // 强制数组方法的回调函数中有 return
        // http://eslint.org/docs/rules/array-callback-return
        'array-callback-return': 2,
        // 把 var 语句看作是在块级作用域范围之内
        'block-scoped-var': 2,
        // 限制 if else 判断复杂度
        complexity: ['error', 11],
        // 要求使用一致的 return 语句
        'consistent-return': 2,
        // 要求遵循大括号约定
        curly: [2, 'multi-line'],
        // 要求 Switch 语句中有 Default 分支
        'default-case': [2, {
            commentPattern: '^no default$'
        }],
        // 访问对象属性要求使用点号
        'dot-notation': [2, {
            allowKeywords: true
        }],
        // 强制在点号之前或之后换行
        'dot-location': 0,
        // 要求使用 === 和 !==
        // http://eslint.org/docs/rules/eqeqeq
        eqeqeq: [2, 'allow-null'],
        // 需要约束 for-in
        // 在使用 for in 遍历对象时，会把从原型链继承来的属性也包括进来。这样会导致意想不到的项出现。
        'guard-for-in': 2,
        // 禁用 Alert
        'no-alert': 1,
        // 禁用 caller 或 callee
        'no-caller': 2,
        // 禁止在 case 或 default 子句中出现方法声明
        // http://eslint.org/docs/rules/no-case-declarations.html
        'no-case-declarations': 2,
        // 禁止使用看起来像除法的正则表达式 /=foo/ => /\=foo/
        'no-div-regex': 0,
        // 禁止在 else 前有 return
        'no-else-return': 2,
        // 禁止出现空函数
        // http://eslint.org/docs/rules/no-empty-function
        'no-empty-function': [2, {
            allow: ['arrowFunctions', 'functions', 'methods', 'constructors']
        }],
        // 禁止使用空解构模式
        // http://eslint.org/docs/rules/no-empty-pattern
        'no-empty-pattern': 2,
        // 禁止与 null 进行比较
        'no-eq-null': 0,
        // disallow use of eval()
        'no-eval': 2,
        // 禁止扩展原生对象
        'no-extend-native': 2,
        // 禁止不必要的函数绑定
        'no-extra-bind': 2,
        // 禁用不必要的标签
        // http://eslint.org/docs/rules/no-extra-label
        'no-extra-label': 2,
        // 禁止 case 语句落空
        'no-fallthrough': 2,
        // 禁止声明浮点小数
        'no-floating-decimal': 2,
        // 禁止使用较短的符号实现类型转换
        'no-implicit-coercion': 0,
        // 禁止在全局范围使用 var 和命名函数
        // http://eslint.org/docs/rules/no-implicit-globals
        'no-implicit-globals': 0,
        // 禁用隐式的eval()
        'no-implied-eval': 2,
        // 禁止 this 关键字在类或类对象之外出现
        'no-invalid-this': 0,
        // disallow usage of __iterator__ property
        'no-iterator': 2,
        // disallow use of labels for anything other then loops and switches
        'no-labels': [2, {
            allowLoop: false,
            allowSwitch: false
        }],
        // 禁用不必要的嵌套块
        'no-lone-blocks': 2,
        // 禁止循环中存在函数
        'no-loop-func': 2,
        // 禁止使用魔术数字 没有明确含义的数字 例如 60 * 60 * 60 * 24
        // http://eslint.org/docs/rules/no-magic-numbers
        'no-magic-numbers': [0, {
            ignore: [],
            ignoreArrayIndexes: true,
            enforceConst: true,
            detectObjects: false
        }],
        // 禁止出现多个空格
        'no-multi-spaces': 2,
        // 禁止多行字符串
        'no-multi-str': 2,
        // 禁止对原生对象赋值
        'no-native-reassign': 2,
        // disallow use of new operator when not part of the assignment or comparison
        'no-new': 2,
        // disallow use of new operator for Function object
        'no-new-func': 2,
        // disallows creating new instances of String, Number, and Boolean
        'no-new-wrappers': 2,
        // 禁用八进制字面量
        'no-octal': 2,
        // 禁止在字符串字面量中使用八进制转义序列
        // var foo = 'Copyright \251';
        'no-octal-escape': 2,
        // 禁止对函数参数再赋值
        // 不允许参数对象操作
        // rule: http://eslint.org/docs/rules/no-param-reassign.html
        'no-param-reassign': [2, {
            props: false
        }],
        // disallow usage of __proto__ property
        'no-proto': 2,
        // disallow declaring the same variable more then once
        'no-redeclare': 2,
        // no-return-assign
        'no-return-assign': 2,
        // disallow use of `javascript:` urls.
        'no-script-url': 2,
        // disallow self assignment
        // http://eslint.org/docs/rules/no-self-assign
        'no-self-assign': 2,
        // disallow comparisons where both sides are exactly the same
        'no-self-compare': 2,
        // disallow use of comma operator
        'no-sequences': 2,
        // restrict what can be thrown as an exception
        'no-throw-literal': 2,
        // disallow unmodified conditions of loops
        // http://eslint.org/docs/rules/no-unmodified-loop-condition
        'no-unmodified-loop-condition': 0,
        // disallow usage of expressions in statement position
        'no-unused-expressions': 2,
        // disallow unused labels
        // http://eslint.org/docs/rules/no-unused-labels
        'no-unused-labels': 2,
        // disallow unnecessary .call() and .apply()
        'no-useless-call': 0,
        // disallow useless string concatenation
        // http://eslint.org/docs/rules/no-useless-concat
        'no-useless-concat': 2,
        // disallow unnecessary string escaping
        // http://eslint.org/docs/rules/no-useless-escape
        'no-useless-escape': 2,
        // disallow use of void operator
        'no-void': 0,
        // disallow usage of configurable warning terms in comments: e.g. todo
        'no-warning-comments': [0, {
            terms: ['todo', 'fixme', 'xxx'],
            location: 'start'
        }],
        // disallow use of the with statement
        'no-with': 2,
        // require use of the second argument for parseInt()
        radix: 2,
        // 要求将变量声明放在它们作用域的顶部
        'vars-on-top': 2,
        // 需要把立即执行的函数包裹起来
        // http://eslint.org/docs/rules/wrap-iife.html
        'wrap-iife': [2, 'outside'],
        // 要求或者禁止Yoda条件
        yoda: 2
    }
};
