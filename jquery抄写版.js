(function(global,factory){
    "use strict";
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = global.document ? factory(global,true) : function(w){
            if(!w.document){
                throw new Error("jQuery需要一个带有文档的窗口");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this,function(window, noGlobal){
    "use strict";
    var arr = [];
    var document = window.document;
    var getProto = Object.getPrototypeOf;
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var support = {};

        function DOMEval(code,doc){
            doc = doc || document;
            var script = doc.createElement("script");
            script.text = code;
            doc.head.appendChild(script).parentNode.removeChild(script);
        }

        var 
            version = "3.2.0",
            jQuery = function(selector, context){
                return new jQuery.fn.init(selector,context);
            },
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([a-z])/g,

            fcamelCase = function(all,letter){
                return letter.toUpperCase();
            };
    jQuery.fn = jQuery.prototype = {
        jquery:version,
        constrcutor:jquery,
        length: 0,
        toArray:function(){
            return slice.call(this);
        },
        get: function(num){
            if(num == null){
                return slice.call(this);
            }
            return num < 0 ? this[num + this.length] : this[num];
        },
        pushStack: function(elems){
            //构建一个新的jQuery匹配元素集
            var ret = jquery.merge(this.constrcutor(),elems);
            //将旧对象添加到堆栈（作为参考）
            ret.prevObject = this;
            // 返回新形成的元素集
            return ret;
        },
        //对匹配集合中的每个元素执行回调。
        each: function(callback){
            return jQuery.each(this,callback);
        },
        map:function(callback){
            return this.pushStack(jQuery.map(this,function(elem,i){
                return callback.call(elem,i,elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this,arguments));
        },
        first: function(){
            return this.eq(0);
        },
        last: function(){
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function(){
            return this.prevObject || this.constrcutor();
        },

        push: push,
        sort: arr.sort,
        splice: arr.splice
    };

jQuery.extend = jQuery.fn.extend = function() {
    var option, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    //处理深层复制情况
    if( typeof target === "boolean" ){
        deep = target;

        //跳过布尔值和目标
        target = arguments[i] || {};
        i++;
    }

    //当目标是一个字符串或某些东西（可能在深层拷贝中）处理情况
    if( typeof target !== "object" && !jQuery.isFunction(target)){
        target = {};
    }

    //如果只传递一个参数，则扩展jQuery本身
    if( i === length){
        target = this;
        i--;
    }

    for( ; i < length; i ++){
        //仅处理非空/未定义的值
        if((option = arguments[i]) != null){
            //扩展基础对象
            for(name in options){
                src = target[name];
                copy = options[name];

                //防止永无止境的循环
                if(target === copy ){
                    continue;
                }

                //如果我们合并了普通的对象或数组，则重新运行
                if( deep && copy && (jQuery.isPlainObject( copy ) || 
                    ( copyIsArray = Array.isArray( copy )))){

                        if(copyIsArray){
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        }else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        //永远不要移动原始对象，克隆它们
                        target[name] = jQuery.extend( deep, clone, copy );

                    //不要带入未定义的值
                    }else if(copy !== undefined){
                        target[name] = copy;
                    }
            }
        }
    }

    //返回修改后的对象
    return target;
};

jQuery.extend({
    //对于页面上的jQuery的每个副本都是唯一的
    expando: "jQuery" + (version + Math.random()).replace( /\D/g,""),

    //假设没有准备好的模块，jQuery已经准备就绪
    isReady: true,

    error: function(msg){
        throw new Error( msg );
    },

    noop: function() {},

    isFunction: function(obj){
        return jQuery.type(obj) === "function";
    },

    isWindow: function(obj){
        return obj != null && obj === obj.window;
    },

    isNumeric: function(obj){
        //截至jQuery 3.0，isNumeric仅限于
        //字符串和数字（基元或对象）
        //可以强制为有限的数字（gh-2662）
        var type = jQuery.type(obj);
        return (type === "number" || type === "string") &&
        //parseFloat NaNs数字投射假阳性("")
        // ...但是误解了前导数字串，特别是十六进制文字（“0x ...”）
        //减少力量无限到NaN
        !isNaN(obj - parseFloat(obj));
    },

    isPlainObject: function(obj){
        var proto,Ctor;
        
        //检测明显的负片
        //使用toString而不是jQuery.type来捕获主机对象
        if(!obj || toString.call(obj) !== "[object Object]"){
            return false;
        }

        proto = getProto(obj);

        //没有原型的对象（例如`Object.create（null）`）很简单
        if(!proto){
            return true;
        }

        //具有原型的对象是平面的，如果它们是由全局Object函数构造的
        Ctor = hasOwn.call(proto, "constructor") && proto.constrcutor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },
    isEmptyObject: function(obj){
        /* eslint-disable no-unused-vars */
        //参见https://github.com/eslint/eslint/issues/6125
        var name;
        
        for( name in obj ){
            return false;
        }
        return true;
    },
    type: function(obj){
        if(obj == null){
            return obj + "";
        }

        //支持：Android <= 2.3（功能RegExp）
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call(obj)] || "object" : typeof obj;
    },

    //在全局上下文中评估脚本
    globalEval: function(code){
        DOMEval(code);
    },

    //转换为camelCase; 由css和数据模块使用
    //支持：IE <= 9 - 11，Edge 12 - 13
    //微软忘了打破他们的厂商前缀（＃9572）
    cameCase: function(string){
        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    },
    
    each: function(obj, callback){
        var length, i = 0;
        if( isArrayLike(obj) ){
            length = obj.length;
            for( ; i < length; i++ ){
                if( callback.call( obj[ i ], i, obj[ i ] ) === false ){
                    break;
                }
            }
        }else {
            for ( i in obj){
                if( callback.call( obj[ i ], i, obj[ i ] ) === false ){
                    break;
                }
            }
        }

        return obj;
    },

    //支持：Android <= 4.0仅
    trim: function(text){
        return text == unll ? "" : (text + "").replace( rtrim, "");
    },

    //结果仅供内部使用
    makeArray: function(arr, results){
        var ret = results || [];

        if(arr != null){
            if( isArrayLike( Object(arr) ) ){
                jQuery.merge( ret, typeof arr === "string" ? [arr] : arr);
            }else {
                push.call( ret, arr);
            }
        }
        return ret;
    },

    inArray: function(elem, arr, i){
        return arr == null ? -1 : indexOf.call( arr, elem, i);
    },

    //支持：Android <= 4.0，仅限PhantomJS 1
    // push.apply（_，arraylike）扔在古代WebKit上
    merge: function(first, second){
        var len = +second.length,
            j = 0,
            i = first.length;

        for ( ; j < len; j++){
            first[ i++ ] = second[ j ];
        }

        first.length = i;
        return first;
    },

    grep: function(elems, callback, invert){
        var callbackInverse,
            matches = [],
            i = 0,
            length = elems.length,
            callbackExpect = !invert;

        //通过数组，只保存项目
        //通过验证器函数
        for( ; i < length; i++ ){
            callbackInverse = !callback( elems[i], i );
            if( callbackInverse !== callbackExpect ){
                matches.push( elems[i] );
            }
        }

        return matches;
    },

    // arg仅供内部使用
    map: function( elems, callback, arg ){
        var length, value,
            i = 0,
            ret = [];

        //遍历数组，将每个项目转换为新值
        if( isArrayLike( elems ) ){
            length = elems.length;
            for( ; i < length; i++ ){
                value = callback( elems[i], i, arg );

                if( value != null ){
                    ret.push( value );
                }
            }
            //通过对象上的每个键，
        }else {
            for( i in elems){
                value = callback(elems[i], i, arg);

                if( value != null ){
                    ret.push( value );
                }
            }
        }

        //平铺任何嵌套数组
        return concat.apply( [], ret );
    },

    //对象的全局GUIDE计数器
    guid: 1,


    //将函数绑定到上下文中，可选地部分地应用任何参数。
    proxy: function( fn, context ) {
        var tmp, args, proxy;

        if( typeof context === "string" ){
            tmp = fn[context];
            context = fn;
            fn = tmp;
        }

        //快速检查以确定目标是否可调用，在spec中会抛出一个TypeError，但是我们将返回undefined。
        if( !jQuery.isFunction(fn)){
            return undefined;
        }

        //模拟绑定
        args = slice.call( arguments, 2 );
        proxy = function(){
            return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
        };

        //将唯一处理程序的guid设置为原始处理程序的相同，因此可以将其删除
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;
        return proxy;
    },

    now: Date.now,

    // jQuery.support不用于Core，但其他项目将其属性附加到它，因此它需要存在。
    support: support
});

if( typeof Symbol === "function" ){
    jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

//填充class2type映射
//布尔值字符串函数数组日期RegExp对象错误符号
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
function( i, name){
    class2type[ "[object" + name + "]" ] = name.toLowerCase();
});

function isArrayLike(obj){
    //支持：只有真正的iOS 8.2（在模拟器中不可重现）
    //`in`检查用于防止JIT错误（gh-2145）
    //由于假阴性，hasOwn不在这里使用
    //关于IE中的Nodelist长度

    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type( obj );

    if( type === "function" || jQuery.isWindow(obj) ){
        return false;
    }

    return type === "array" || length === 0 || 
        typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

var Sizzle = (function(window){
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,

        //本地文档vars
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,

        //实例特定数据
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function( a, b ){
            if( a === b ){
                hasDuplicate = true;
            }
            return 0;
        },
        //实例方法
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        //使用一个精简的indexOf，因为它比native更快
        //https://jsperf.com/thor-indexof-vs-for/5
        idnexOf = function( list, elem ){
            var i = 0,
                len = list.length;
                for( ; i < len; i++ ){
                    if( list[i] === elem ){
                        return i;
                    }
                }
                return -1;
        },

        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

        //正则表达式

        // http://www.w3.org/TR/css3-selectors/#whitespace
        whitespace = "[\\x20\\t\\r\\n\\f]",

        // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
        identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
            // Operator (capture 2)
            "*([*^$|!~]?=)" + whitespace +
            // “属性值必须是CSS标识符[capture 5]或字符串[capture 3或capture 4]”
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
            "*\\]",

        pseudos = ":(" + identifier + ")(?:\\((" +
            // 为了减少preFilter中需要tokenize的选择器数量，更喜欢参数：
            // 1. quoted (capture 3; capture 4 or capture 5)
            "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
            // 2. simple (capture 6)
            "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
            // 3. anything else (capture 2)
            ".*" +
            ")\\)|)",

        // 前导和非转义的尾随空格，捕获后面的一些非空格字符
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// 用于实现.is（）的库
		// 我们将它用于“select”中的POS匹配
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// 易于解析/可检索的ID或TAG或CLASS选择器
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS转义
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN表示非码点
		// 支持: Firefox<24
		// 解决办法+“0x”的错误数字解释
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP代码点
				String.fromCharCode( high + 0x10000 ) :
				// 补充平面代码点（代理对）
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS字符串/标识符序列化
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U + 0000 NULL变为U + FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// 控制字符和（取决于位置）数字作为代码点被转义
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// 其他可能特殊的ASCII字符得到反斜杠转义
		return "\\" + ch;
    },

    //用于iframe
    //参见setDocument（）
    //删除函数包装器导致IE中的“权限被拒绝”错误
    unloadHandler = function(){
        setDocument();
    },

    disabledAncestor = addCombinator(
        function( elem ){
            return elem.disabled === true && ("form" in elem || "label" in elem);
        },
        {dir: "parentNode", next: "legend"}
    );
//优化push.apply（_，NodeList）
try {
    push.apply(
        (arr = slice.call( preferredDoc.childNodes )),
        preferredDoc.childNodes
    );
    //支持：Android<4.0
    //检测默认无效push.apply
    arr[ preferredDoc.childNodes.length ].nodeType;
}catch( e ){
    push = { apply: arr.length ?
        //如果可能，杠杆切片
        function( target, les ){
            push_native.apply( target, slice.call(els) );
        } :
        //支持：IE<9
        //否则直接附加
        function( target, els ){
            var j = target.length,
                i = 0;
            //不能信任NodeList.length
            while( (target[j++] = els[i++]) ){}
            target.length = j - 1;
        }
    };
}
function Sizzle( selector, context, results, seed ){
        var m, i, elem, nid, match, groups, newSelector,
            newContext = context && context.ownerDocument,

            //nodeType默认为9，因为context默认为document
            nodeType = context ? context.nodeType : 9;

        results = results || [];

}

})

})