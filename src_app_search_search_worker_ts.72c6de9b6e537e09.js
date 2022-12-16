(()=>{var G={3197:(w,T,O)=>{var C,P;!function(){var e,t=function(e){var r=new t.Builder;return r.pipeline.add(t.trimmer,t.stopWordFilter,t.stemmer),r.searchPipeline.add(t.stemmer),e.call(r,r),r.build()};t.version="2.3.9",t.utils={},t.utils.warn=(e=this,function(r){e.console&&console.warn&&console.warn(r)}),t.utils.asString=function(e){return null==e?"":e.toString()},t.utils.clone=function(e){if(null==e)return e;for(var r=Object.create(null),i=Object.keys(e),n=0;n<i.length;n++){var s=i[n],o=e[s];if(Array.isArray(o))r[s]=o.slice();else{if("string"!=typeof o&&"number"!=typeof o&&"boolean"!=typeof o)throw new TypeError("clone is not deep and does not support nested objects");r[s]=o}}return r},t.FieldRef=function(e,r,i){this.docRef=e,this.fieldName=r,this._stringValue=i},t.FieldRef.joiner="/",t.FieldRef.fromString=function(e){var r=e.indexOf(t.FieldRef.joiner);if(-1===r)throw"malformed field ref string";var i=e.slice(0,r),n=e.slice(r+1);return new t.FieldRef(n,i,e)},t.FieldRef.prototype.toString=function(){return null==this._stringValue&&(this._stringValue=this.fieldName+t.FieldRef.joiner+this.docRef),this._stringValue},t.Set=function(e){if(this.elements=Object.create(null),e){this.length=e.length;for(var r=0;r<this.length;r++)this.elements[e[r]]=!0}else this.length=0},t.Set.complete={intersect:function(e){return e},union:function(){return this},contains:function(){return!0}},t.Set.empty={intersect:function(){return this},union:function(e){return e},contains:function(){return!1}},t.Set.prototype.contains=function(e){return!!this.elements[e]},t.Set.prototype.intersect=function(e){var r,i,n,s=[];if(e===t.Set.complete)return this;if(e===t.Set.empty)return e;this.length<e.length?(r=this,i=e):(r=e,i=this),n=Object.keys(r.elements);for(var o=0;o<n.length;o++){var a=n[o];a in i.elements&&s.push(a)}return new t.Set(s)},t.Set.prototype.union=function(e){return e===t.Set.complete?t.Set.complete:e===t.Set.empty?this:new t.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))},t.idf=function(e,r){var i=0;for(var n in e)"_index"!=n&&(i+=Object.keys(e[n]).length);return Math.log(1+Math.abs((r-i+.5)/(i+.5)))},t.Token=function(e,r){this.str=e||"",this.metadata=r||{}},t.Token.prototype.toString=function(){return this.str},t.Token.prototype.update=function(e){return this.str=e(this.str,this.metadata),this},t.Token.prototype.clone=function(e){return new t.Token((e=e||function(r){return r})(this.str,this.metadata),this.metadata)},t.tokenizer=function(e,r){if(null==e||null==e)return[];if(Array.isArray(e))return e.map(function(p){return new t.Token(t.utils.asString(p).toLowerCase(),t.utils.clone(r))});for(var i=e.toString().toLowerCase(),n=i.length,s=[],o=0,a=0;o<=n;o++){var u=o-a;if(i.charAt(o).match(t.tokenizer.separator)||o==n){if(u>0){var h=t.utils.clone(r)||{};h.position=[a,u],h.index=s.length,s.push(new t.Token(i.slice(a,o),h))}a=o+1}}return s},t.tokenizer.separator=/[\s\-]+/,t.Pipeline=function(){this._stack=[]},t.Pipeline.registeredFunctions=Object.create(null),t.Pipeline.registerFunction=function(e,r){r in this.registeredFunctions&&t.utils.warn("Overwriting existing registered function: "+r),e.label=r,t.Pipeline.registeredFunctions[e.label]=e},t.Pipeline.warnIfFunctionNotRegistered=function(e){e.label&&e.label in this.registeredFunctions||t.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},t.Pipeline.load=function(e){var r=new t.Pipeline;return e.forEach(function(i){var n=t.Pipeline.registeredFunctions[i];if(!n)throw new Error("Cannot load unregistered function: "+i);r.add(n)}),r},t.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(r){t.Pipeline.warnIfFunctionNotRegistered(r),this._stack.push(r)},this)},t.Pipeline.prototype.after=function(e,r){t.Pipeline.warnIfFunctionNotRegistered(r);var i=this._stack.indexOf(e);if(-1==i)throw new Error("Cannot find existingFn");this._stack.splice(i+=1,0,r)},t.Pipeline.prototype.before=function(e,r){t.Pipeline.warnIfFunctionNotRegistered(r);var i=this._stack.indexOf(e);if(-1==i)throw new Error("Cannot find existingFn");this._stack.splice(i,0,r)},t.Pipeline.prototype.remove=function(e){var r=this._stack.indexOf(e);-1!=r&&this._stack.splice(r,1)},t.Pipeline.prototype.run=function(e){for(var r=this._stack.length,i=0;i<r;i++){for(var n=this._stack[i],s=[],o=0;o<e.length;o++){var a=n(e[o],o,e);if(null!=a&&""!==a)if(Array.isArray(a))for(var l=0;l<a.length;l++)s.push(a[l]);else s.push(a)}e=s}return e},t.Pipeline.prototype.runString=function(e,r){var i=new t.Token(e,r);return this.run([i]).map(function(n){return n.toString()})},t.Pipeline.prototype.reset=function(){this._stack=[]},t.Pipeline.prototype.toJSON=function(){return this._stack.map(function(e){return t.Pipeline.warnIfFunctionNotRegistered(e),e.label})},t.Vector=function(e){this._magnitude=0,this.elements=e||[]},t.Vector.prototype.positionForIndex=function(e){if(0==this.elements.length)return 0;for(var r=0,i=this.elements.length/2,n=i-r,s=Math.floor(n/2),o=this.elements[2*s];n>1&&(o<e&&(r=s),o>e&&(i=s),o!=e);)n=i-r,s=r+Math.floor(n/2),o=this.elements[2*s];return o==e||o>e?2*s:o<e?2*(s+1):void 0},t.Vector.prototype.insert=function(e,r){this.upsert(e,r,function(){throw"duplicate index"})},t.Vector.prototype.upsert=function(e,r,i){this._magnitude=0;var n=this.positionForIndex(e);this.elements[n]==e?this.elements[n+1]=i(this.elements[n+1],r):this.elements.splice(n,0,e,r)},t.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var e=0,r=this.elements.length,i=1;i<r;i+=2){var n=this.elements[i];e+=n*n}return this._magnitude=Math.sqrt(e)},t.Vector.prototype.dot=function(e){for(var r=0,i=this.elements,n=e.elements,s=i.length,o=n.length,a=0,l=0,u=0,h=0;u<s&&h<o;)(a=i[u])<(l=n[h])?u+=2:a>l?h+=2:a==l&&(r+=i[u+1]*n[h+1],u+=2,h+=2);return r},t.Vector.prototype.similarity=function(e){return this.dot(e)/this.magnitude()||0},t.Vector.prototype.toArray=function(){for(var e=new Array(this.elements.length/2),r=1,i=0;r<this.elements.length;r+=2,i++)e[i]=this.elements[r];return e},t.Vector.prototype.toJSON=function(){return this.elements},t.stemmer=function(){var e={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},r={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},n="[aeiouy]",s="[^aeiou][^aeiouy]*",p=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),f=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),S=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$"),x=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy]"),b=/^(.+?)(ss|i)es$/,y=/^(.+?)([^s])s$/,v=/^(.+?)eed$/,_=/^(.+?)(ed|ing)$/,L=/.$/,E=/(at|bl|iz)$/,D=new RegExp("([^aeiouylsz])\\1$"),M=new RegExp("^"+s+n+"[^aeiouwxy]$"),N=/^(.+?[^aeiou])y$/,z=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,$=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,V=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,W=/^(.+?)(s|t)(ion)$/,I=/^(.+?)e$/,q=/ll$/,U=new RegExp("^"+s+n+"[^aeiouwxy]$"),B=function(c){var g,R,k,d,m,F,A;if(c.length<3)return c;if("y"==(k=c.substr(0,1))&&(c=k.toUpperCase()+c.substr(1)),m=y,(d=b).test(c)?c=c.replace(d,"$1$2"):m.test(c)&&(c=c.replace(m,"$1$2")),m=_,(d=v).test(c)){var Q=d.exec(c);(d=p).test(Q[1])&&(c=c.replace(d=L,""))}else if(m.test(c)){Q=m.exec(c);(m=x).test(g=Q[1])&&(F=D,A=M,(m=E).test(c=g)?c+="e":F.test(c)?c=c.replace(d=L,""):A.test(c)&&(c+="e"))}return(d=N).test(c)&&(c=(g=(Q=d.exec(c))[1])+"i"),(d=z).test(c)&&(R=(Q=d.exec(c))[2],(d=p).test(g=Q[1])&&(c=g+e[R])),(d=$).test(c)&&(R=(Q=d.exec(c))[2],(d=p).test(g=Q[1])&&(c=g+r[R])),m=W,(d=V).test(c)?(Q=d.exec(c),(d=f).test(g=Q[1])&&(c=g)):m.test(c)&&(Q=m.exec(c),(m=f).test(g=Q[1]+Q[2])&&(c=g)),(d=I).test(c)&&(Q=d.exec(c),m=S,F=U,((d=f).test(g=Q[1])||m.test(g)&&!F.test(g))&&(c=g)),m=f,(d=q).test(c)&&m.test(c)&&(c=c.replace(d=L,"")),"y"==k&&(c=k.toLowerCase()+c.substr(1)),c};return function(j){return j.update(B)}}(),t.Pipeline.registerFunction(t.stemmer,"stemmer"),t.generateStopWordFilter=function(e){var r=e.reduce(function(i,n){return i[n]=n,i},{});return function(i){if(i&&r[i.toString()]!==i.toString())return i}},t.stopWordFilter=t.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),t.Pipeline.registerFunction(t.stopWordFilter,"stopWordFilter"),t.trimmer=function(e){return e.update(function(r){return r.replace(/^\W+/,"").replace(/\W+$/,"")})},t.Pipeline.registerFunction(t.trimmer,"trimmer"),t.TokenSet=function(){this.final=!1,this.edges={},this.id=t.TokenSet._nextId,t.TokenSet._nextId+=1},t.TokenSet._nextId=1,t.TokenSet.fromArray=function(e){for(var r=new t.TokenSet.Builder,i=0,n=e.length;i<n;i++)r.insert(e[i]);return r.finish(),r.root},t.TokenSet.fromClause=function(e){return"editDistance"in e?t.TokenSet.fromFuzzyString(e.term,e.editDistance):t.TokenSet.fromString(e.term)},t.TokenSet.fromFuzzyString=function(e,r){for(var i=new t.TokenSet,n=[{node:i,editsRemaining:r,str:e}];n.length;){var s=n.pop();if(s.str.length>0){var a,o=s.str.charAt(0);o in s.node.edges?a=s.node.edges[o]:(a=new t.TokenSet,s.node.edges[o]=a),1==s.str.length&&(a.final=!0),n.push({node:a,editsRemaining:s.editsRemaining,str:s.str.slice(1)})}if(0!=s.editsRemaining){if("*"in s.node.edges)var l=s.node.edges["*"];else l=new t.TokenSet,s.node.edges["*"]=l;if(0==s.str.length&&(l.final=!0),n.push({node:l,editsRemaining:s.editsRemaining-1,str:s.str}),s.str.length>1&&n.push({node:s.node,editsRemaining:s.editsRemaining-1,str:s.str.slice(1)}),1==s.str.length&&(s.node.final=!0),s.str.length>=1){if("*"in s.node.edges)var u=s.node.edges["*"];else u=new t.TokenSet,s.node.edges["*"]=u;1==s.str.length&&(u.final=!0),n.push({node:u,editsRemaining:s.editsRemaining-1,str:s.str.slice(1)})}if(s.str.length>1){var f,h=s.str.charAt(0),p=s.str.charAt(1);p in s.node.edges?f=s.node.edges[p]:(f=new t.TokenSet,s.node.edges[p]=f),1==s.str.length&&(f.final=!0),n.push({node:f,editsRemaining:s.editsRemaining-1,str:h+s.str.slice(2)})}}}return i},t.TokenSet.fromString=function(e){for(var r=new t.TokenSet,i=r,n=0,s=e.length;n<s;n++){var o=e[n],a=n==s-1;if("*"==o)r.edges[o]=r,r.final=a;else{var l=new t.TokenSet;l.final=a,r.edges[o]=l,r=l}}return i},t.TokenSet.prototype.toArray=function(){for(var e=[],r=[{prefix:"",node:this}];r.length;){var i=r.pop(),n=Object.keys(i.node.edges),s=n.length;i.node.final&&(i.prefix.charAt(0),e.push(i.prefix));for(var o=0;o<s;o++){var a=n[o];r.push({prefix:i.prefix.concat(a),node:i.node.edges[a]})}}return e},t.TokenSet.prototype.toString=function(){if(this._str)return this._str;for(var e=this.final?"1":"0",r=Object.keys(this.edges).sort(),i=r.length,n=0;n<i;n++){var s=r[n];e=e+s+this.edges[s].id}return e},t.TokenSet.prototype.intersect=function(e){for(var r=new t.TokenSet,i=void 0,n=[{qNode:e,output:r,node:this}];n.length;){i=n.pop();for(var s=Object.keys(i.qNode.edges),o=s.length,a=Object.keys(i.node.edges),l=a.length,u=0;u<o;u++)for(var h=s[u],p=0;p<l;p++){var f=a[p];if(f==h||"*"==h){var S=i.node.edges[f],x=i.qNode.edges[h],b=S.final&&x.final,y=void 0;f in i.output.edges?(y=i.output.edges[f]).final=y.final||b:((y=new t.TokenSet).final=b,i.output.edges[f]=y),n.push({qNode:x,output:y,node:S})}}}return r},t.TokenSet.Builder=function(){this.previousWord="",this.root=new t.TokenSet,this.uncheckedNodes=[],this.minimizedNodes={}},t.TokenSet.Builder.prototype.insert=function(e){var r,i=0;if(e<this.previousWord)throw new Error("Out of order word insertion");for(var n=0;n<e.length&&n<this.previousWord.length&&e[n]==this.previousWord[n];n++)i++;for(this.minimize(i),r=0==this.uncheckedNodes.length?this.root:this.uncheckedNodes[this.uncheckedNodes.length-1].child,n=i;n<e.length;n++){var s=new t.TokenSet,o=e[n];r.edges[o]=s,this.uncheckedNodes.push({parent:r,char:o,child:s}),r=s}r.final=!0,this.previousWord=e},t.TokenSet.Builder.prototype.finish=function(){this.minimize(0)},t.TokenSet.Builder.prototype.minimize=function(e){for(var r=this.uncheckedNodes.length-1;r>=e;r--){var i=this.uncheckedNodes[r],n=i.child.toString();n in this.minimizedNodes?i.parent.edges[i.char]=this.minimizedNodes[n]:(i.child._str=n,this.minimizedNodes[n]=i.child),this.uncheckedNodes.pop()}},t.Index=function(e){this.invertedIndex=e.invertedIndex,this.fieldVectors=e.fieldVectors,this.tokenSet=e.tokenSet,this.fields=e.fields,this.pipeline=e.pipeline},t.Index.prototype.search=function(e){return this.query(function(r){new t.QueryParser(e,r).parse()})},t.Index.prototype.query=function(e){for(var r=new t.Query(this.fields),i=Object.create(null),n=Object.create(null),s=Object.create(null),o=Object.create(null),a=Object.create(null),l=0;l<this.fields.length;l++)n[this.fields[l]]=new t.Vector;for(e.call(r,r),l=0;l<r.clauses.length;l++){var h,u=r.clauses[l],p=t.Set.empty;h=u.usePipeline?this.pipeline.runString(u.term,{fields:u.fields}):[u.term];for(var f=0;f<h.length;f++){u.term=h[f];var x=t.TokenSet.fromClause(u),b=this.tokenSet.intersect(x).toArray();if(0===b.length&&u.presence===t.Query.presence.REQUIRED){for(var y=0;y<u.fields.length;y++)o[v=u.fields[y]]=t.Set.empty;break}for(var _=0;_<b.length;_++){var L=b[_],E=this.invertedIndex[L],D=E._index;for(y=0;y<u.fields.length;y++){var M=E[v=u.fields[y]],N=Object.keys(M),z=L+"/"+v,$=new t.Set(N);if(u.presence==t.Query.presence.REQUIRED&&(p=p.union($),void 0===o[v]&&(o[v]=t.Set.complete)),u.presence!=t.Query.presence.PROHIBITED){if(n[v].upsert(D,u.boost,function(Z,K){return Z+K}),!s[z]){for(var V=0;V<N.length;V++){var U,W=N[V],I=new t.FieldRef(W,v),q=M[W];void 0===(U=i[I])?i[I]=new t.MatchData(L,v,q):U.add(L,v,q)}s[z]=!0}}else void 0===a[v]&&(a[v]=t.Set.empty),a[v]=a[v].union($)}}}if(u.presence===t.Query.presence.REQUIRED)for(y=0;y<u.fields.length;y++)o[v=u.fields[y]]=o[v].intersect(p)}var B=t.Set.complete,j=t.Set.empty;for(l=0;l<this.fields.length;l++){var v;o[v=this.fields[l]]&&(B=B.intersect(o[v])),a[v]&&(j=j.union(a[v]))}var c=Object.keys(i),g=[],R=Object.create(null);if(r.isNegated())for(c=Object.keys(this.fieldVectors),l=0;l<c.length;l++){var k=t.FieldRef.fromString(I=c[l]);i[I]=new t.MatchData}for(l=0;l<c.length;l++){var d=(k=t.FieldRef.fromString(c[l])).docRef;if(B.contains(d)&&!j.contains(d)){var A,F=n[k.fieldName].similarity(this.fieldVectors[k]);if(void 0!==(A=R[d]))A.score+=F,A.matchData.combine(i[k]);else{var Q={ref:d,score:F,matchData:i[k]};R[d]=Q,g.push(Q)}}}return g.sort(function(X,Y){return Y.score-X.score})},t.Index.prototype.toJSON=function(){var e=Object.keys(this.invertedIndex).sort().map(function(i){return[i,this.invertedIndex[i]]},this),r=Object.keys(this.fieldVectors).map(function(i){return[i,this.fieldVectors[i].toJSON()]},this);return{version:t.version,fields:this.fields,fieldVectors:r,invertedIndex:e,pipeline:this.pipeline.toJSON()}},t.Index.load=function(e){var r={},i={},n=e.fieldVectors,s=Object.create(null),o=e.invertedIndex,a=new t.TokenSet.Builder,l=t.Pipeline.load(e.pipeline);e.version!=t.version&&t.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+t.version+"' does not match serialized index '"+e.version+"'");for(var u=0;u<n.length;u++)i[(h=n[u])[0]]=new t.Vector(h[1]);for(u=0;u<o.length;u++){var h,S=(h=o[u])[0],x=h[1];a.insert(S),s[S]=x}return a.finish(),r.fields=e.fields,r.fieldVectors=i,r.invertedIndex=s,r.tokenSet=a.root,r.pipeline=l,new t.Index(r)},t.Builder=function(){this._ref="id",this._fields=Object.create(null),this._documents=Object.create(null),this.invertedIndex=Object.create(null),this.fieldTermFrequencies={},this.fieldLengths={},this.tokenizer=t.tokenizer,this.pipeline=new t.Pipeline,this.searchPipeline=new t.Pipeline,this.documentCount=0,this._b=.75,this._k1=1.2,this.termIndex=0,this.metadataWhitelist=[]},t.Builder.prototype.ref=function(e){this._ref=e},t.Builder.prototype.field=function(e,r){if(/\//.test(e))throw new RangeError("Field '"+e+"' contains illegal character '/'");this._fields[e]=r||{}},t.Builder.prototype.b=function(e){this._b=e<0?0:e>1?1:e},t.Builder.prototype.k1=function(e){this._k1=e},t.Builder.prototype.add=function(e,r){var i=e[this._ref],n=Object.keys(this._fields);this._documents[i]=r||{},this.documentCount+=1;for(var s=0;s<n.length;s++){var o=n[s],a=this._fields[o].extractor,l=a?a(e):e[o],u=this.tokenizer(l,{fields:[o]}),h=this.pipeline.run(u),p=new t.FieldRef(i,o),f=Object.create(null);this.fieldTermFrequencies[p]=f,this.fieldLengths[p]=0,this.fieldLengths[p]+=h.length;for(var S=0;S<h.length;S++){var x=h[S];if(null==f[x]&&(f[x]=0),f[x]+=1,null==this.invertedIndex[x]){var b=Object.create(null);b._index=this.termIndex,this.termIndex+=1;for(var y=0;y<n.length;y++)b[n[y]]=Object.create(null);this.invertedIndex[x]=b}null==this.invertedIndex[x][o][i]&&(this.invertedIndex[x][o][i]=Object.create(null));for(var v=0;v<this.metadataWhitelist.length;v++){var _=this.metadataWhitelist[v],L=x.metadata[_];null==this.invertedIndex[x][o][i][_]&&(this.invertedIndex[x][o][i][_]=[]),this.invertedIndex[x][o][i][_].push(L)}}}},t.Builder.prototype.calculateAverageFieldLengths=function(){for(var e=Object.keys(this.fieldLengths),r=e.length,i={},n={},s=0;s<r;s++){var o=t.FieldRef.fromString(e[s]),a=o.fieldName;n[a]||(n[a]=0),n[a]+=1,i[a]||(i[a]=0),i[a]+=this.fieldLengths[o]}var l=Object.keys(this._fields);for(s=0;s<l.length;s++){var u=l[s];i[u]=i[u]/n[u]}this.averageFieldLength=i},t.Builder.prototype.createFieldVectors=function(){for(var e={},r=Object.keys(this.fieldTermFrequencies),i=r.length,n=Object.create(null),s=0;s<i;s++){for(var o=t.FieldRef.fromString(r[s]),a=o.fieldName,l=this.fieldLengths[o],u=new t.Vector,h=this.fieldTermFrequencies[o],p=Object.keys(h),f=p.length,S=this._fields[a].boost||1,x=this._documents[o.docRef].boost||1,b=0;b<f;b++){var L,E,D,y=p[b],v=h[y],_=this.invertedIndex[y]._index;void 0===n[y]?(L=t.idf(this.invertedIndex[y],this.documentCount),n[y]=L):L=n[y],E=L*((this._k1+1)*v)/(this._k1*(1-this._b+this._b*(l/this.averageFieldLength[a]))+v),E*=S,E*=x,D=Math.round(1e3*E)/1e3,u.insert(_,D)}e[o]=u}this.fieldVectors=e},t.Builder.prototype.createTokenSet=function(){this.tokenSet=t.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())},t.Builder.prototype.build=function(){return this.calculateAverageFieldLengths(),this.createFieldVectors(),this.createTokenSet(),new t.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:Object.keys(this._fields),pipeline:this.searchPipeline})},t.Builder.prototype.use=function(e){var r=Array.prototype.slice.call(arguments,1);r.unshift(this),e.apply(this,r)},t.MatchData=function(e,r,i){for(var n=Object.create(null),s=Object.keys(i||{}),o=0;o<s.length;o++){var a=s[o];n[a]=i[a].slice()}this.metadata=Object.create(null),void 0!==e&&(this.metadata[e]=Object.create(null),this.metadata[e][r]=n)},t.MatchData.prototype.combine=function(e){for(var r=Object.keys(e.metadata),i=0;i<r.length;i++){var n=r[i],s=Object.keys(e.metadata[n]);null==this.metadata[n]&&(this.metadata[n]=Object.create(null));for(var o=0;o<s.length;o++){var a=s[o],l=Object.keys(e.metadata[n][a]);null==this.metadata[n][a]&&(this.metadata[n][a]=Object.create(null));for(var u=0;u<l.length;u++){var h=l[u];this.metadata[n][a][h]=null==this.metadata[n][a][h]?e.metadata[n][a][h]:this.metadata[n][a][h].concat(e.metadata[n][a][h])}}}},t.MatchData.prototype.add=function(e,r,i){if(!(e in this.metadata))return this.metadata[e]=Object.create(null),void(this.metadata[e][r]=i);if(r in this.metadata[e])for(var n=Object.keys(i),s=0;s<n.length;s++){var o=n[s];this.metadata[e][r][o]=o in this.metadata[e][r]?this.metadata[e][r][o].concat(i[o]):i[o]}else this.metadata[e][r]=i},t.Query=function(e){this.clauses=[],this.allFields=e},t.Query.wildcard=new String("*"),t.Query.wildcard.NONE=0,t.Query.wildcard.LEADING=1,t.Query.wildcard.TRAILING=2,t.Query.presence={OPTIONAL:1,REQUIRED:2,PROHIBITED:3},t.Query.prototype.clause=function(e){return"fields"in e||(e.fields=this.allFields),"boost"in e||(e.boost=1),"usePipeline"in e||(e.usePipeline=!0),"wildcard"in e||(e.wildcard=t.Query.wildcard.NONE),e.wildcard&t.Query.wildcard.LEADING&&e.term.charAt(0)!=t.Query.wildcard&&(e.term="*"+e.term),e.wildcard&t.Query.wildcard.TRAILING&&e.term.slice(-1)!=t.Query.wildcard&&(e.term=e.term+"*"),"presence"in e||(e.presence=t.Query.presence.OPTIONAL),this.clauses.push(e),this},t.Query.prototype.isNegated=function(){for(var e=0;e<this.clauses.length;e++)if(this.clauses[e].presence!=t.Query.presence.PROHIBITED)return!1;return!0},t.Query.prototype.term=function(e,r){if(Array.isArray(e))return e.forEach(function(n){this.term(n,t.utils.clone(r))},this),this;var i=r||{};return i.term=e.toString(),this.clause(i),this},t.QueryParseError=function(e,r,i){this.name="QueryParseError",this.message=e,this.start=r,this.end=i},t.QueryParseError.prototype=new Error,t.QueryLexer=function(e){this.lexemes=[],this.str=e,this.length=e.length,this.pos=0,this.start=0,this.escapeCharPositions=[]},t.QueryLexer.prototype.run=function(){for(var e=t.QueryLexer.lexText;e;)e=e(this)},t.QueryLexer.prototype.sliceString=function(){for(var e=[],r=this.start,i=this.pos,n=0;n<this.escapeCharPositions.length;n++)e.push(this.str.slice(r,i=this.escapeCharPositions[n])),r=i+1;return e.push(this.str.slice(r,this.pos)),this.escapeCharPositions.length=0,e.join("")},t.QueryLexer.prototype.emit=function(e){this.lexemes.push({type:e,str:this.sliceString(),start:this.start,end:this.pos}),this.start=this.pos},t.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1),this.pos+=1},t.QueryLexer.prototype.next=function(){if(this.pos>=this.length)return t.QueryLexer.EOS;var e=this.str.charAt(this.pos);return this.pos+=1,e},t.QueryLexer.prototype.width=function(){return this.pos-this.start},t.QueryLexer.prototype.ignore=function(){this.start==this.pos&&(this.pos+=1),this.start=this.pos},t.QueryLexer.prototype.backup=function(){this.pos-=1},t.QueryLexer.prototype.acceptDigitRun=function(){var e,r;do{r=(e=this.next()).charCodeAt(0)}while(r>47&&r<58);e!=t.QueryLexer.EOS&&this.backup()},t.QueryLexer.prototype.more=function(){return this.pos<this.length},t.QueryLexer.EOS="EOS",t.QueryLexer.FIELD="FIELD",t.QueryLexer.TERM="TERM",t.QueryLexer.EDIT_DISTANCE="EDIT_DISTANCE",t.QueryLexer.BOOST="BOOST",t.QueryLexer.PRESENCE="PRESENCE",t.QueryLexer.lexField=function(e){return e.backup(),e.emit(t.QueryLexer.FIELD),e.ignore(),t.QueryLexer.lexText},t.QueryLexer.lexTerm=function(e){if(e.width()>1&&(e.backup(),e.emit(t.QueryLexer.TERM)),e.ignore(),e.more())return t.QueryLexer.lexText},t.QueryLexer.lexEditDistance=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(t.QueryLexer.EDIT_DISTANCE),t.QueryLexer.lexText},t.QueryLexer.lexBoost=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(t.QueryLexer.BOOST),t.QueryLexer.lexText},t.QueryLexer.lexEOS=function(e){e.width()>0&&e.emit(t.QueryLexer.TERM)},t.QueryLexer.termSeparator=t.tokenizer.separator,t.QueryLexer.lexText=function(e){for(;;){var r=e.next();if(r==t.QueryLexer.EOS)return t.QueryLexer.lexEOS;if(92!=r.charCodeAt(0)){if(":"==r)return t.QueryLexer.lexField;if("~"==r)return e.backup(),e.width()>0&&e.emit(t.QueryLexer.TERM),t.QueryLexer.lexEditDistance;if("^"==r)return e.backup(),e.width()>0&&e.emit(t.QueryLexer.TERM),t.QueryLexer.lexBoost;if("+"==r&&1===e.width()||"-"==r&&1===e.width())return e.emit(t.QueryLexer.PRESENCE),t.QueryLexer.lexText;if(r.match(t.QueryLexer.termSeparator))return t.QueryLexer.lexTerm}else e.escapeCharacter()}},t.QueryParser=function(e,r){this.lexer=new t.QueryLexer(e),this.query=r,this.currentClause={},this.lexemeIdx=0},t.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes;for(var e=t.QueryParser.parseClause;e;)e=e(this);return this.query},t.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},t.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme();return this.lexemeIdx+=1,e},t.QueryParser.prototype.nextClause=function(){this.query.clause(this.currentClause),this.currentClause={}},t.QueryParser.parseClause=function(e){var r=e.peekLexeme();if(null!=r)switch(r.type){case t.QueryLexer.PRESENCE:return t.QueryParser.parsePresence;case t.QueryLexer.FIELD:return t.QueryParser.parseField;case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var i="expected either a field or a term, found "+r.type;throw r.str.length>=1&&(i+=" with value '"+r.str+"'"),new t.QueryParseError(i,r.start,r.end)}},t.QueryParser.parsePresence=function(e){var r=e.consumeLexeme();if(null!=r){switch(r.str){case"-":e.currentClause.presence=t.Query.presence.PROHIBITED;break;case"+":e.currentClause.presence=t.Query.presence.REQUIRED;break;default:throw new t.QueryParseError("unrecognised presence operator'"+r.str+"'",r.start,r.end)}var n=e.peekLexeme();if(null==n)throw new t.QueryParseError("expecting term or field, found nothing",r.start,r.end);switch(n.type){case t.QueryLexer.FIELD:return t.QueryParser.parseField;case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:throw new t.QueryParseError("expecting term or field, found '"+n.type+"'",n.start,n.end)}}},t.QueryParser.parseField=function(e){var r=e.consumeLexeme();if(null!=r){if(-1==e.query.allFields.indexOf(r.str)){var i=e.query.allFields.map(function(o){return"'"+o+"'"}).join(", ");throw new t.QueryParseError("unrecognised field '"+r.str+"', possible fields: "+i,r.start,r.end)}e.currentClause.fields=[r.str];var s=e.peekLexeme();if(null==s)throw new t.QueryParseError("expecting term, found nothing",r.start,r.end);if(s.type===t.QueryLexer.TERM)return t.QueryParser.parseTerm;throw new t.QueryParseError("expecting term, found '"+s.type+"'",s.start,s.end)}},t.QueryParser.parseTerm=function(e){var r=e.consumeLexeme();if(null!=r){e.currentClause.term=r.str.toLowerCase(),-1!=r.str.indexOf("*")&&(e.currentClause.usePipeline=!1);var i=e.peekLexeme();if(null==i)return void e.nextClause();switch(i.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:throw new t.QueryParseError("Unexpected lexeme type '"+i.type+"'",i.start,i.end)}}},t.QueryParser.parseEditDistance=function(e){var r=e.consumeLexeme();if(null!=r){var i=parseInt(r.str,10);if(isNaN(i))throw new t.QueryParseError("edit distance must be numeric",r.start,r.end);e.currentClause.editDistance=i;var s=e.peekLexeme();if(null==s)return void e.nextClause();switch(s.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:throw new t.QueryParseError("Unexpected lexeme type '"+s.type+"'",s.start,s.end)}}},t.QueryParser.parseBoost=function(e){var r=e.consumeLexeme();if(null!=r){var i=parseInt(r.str,10);if(isNaN(i))throw new t.QueryParseError("boost must be numeric",r.start,r.end);e.currentClause.boost=i;var s=e.peekLexeme();if(null==s)return void e.nextClause();switch(s.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:throw new t.QueryParseError("Unexpected lexeme type '"+s.type+"'",s.start,s.end)}}},void 0!==(P="function"==typeof(C=function(){return t})?C.call(T,O,T,w):C)&&(w.exports=P)}()}},H={};function J(w){var T=H[w];if(void 0!==T)return T.exports;var O=H[w]={exports:{}};return G[w](O,O.exports,J),O.exports}(()=>{"use strict";var w=J(3197);const O={\u751f\u547d:"life",\u5468\u671f:"cycle",\u94a9\u5b50:"hook",\u4f9d\u8d56:"dependency",\u6ce8\u5165:"inject",\u6ce8\u5165\u5668:"injector",\u4ee4\u724c:"token",\u63d0\u4f9b\u8005:"provider",\u670d\u52a1:"service",\u6a21\u5757:"module",\u7ec4\u4ef6:"component",\u6307\u4ee4:"directive",\u6a21\u677f:"template",\u5143\u6570\u636e:"metadata",\u88c5\u9970\u5668:"decorator",\u51fd\u6570:"function",\u5de5\u5382:"factory",\u7ba1\u9053:"pipe",\u8def\u7531:"route",\u8def\u7531\u5668:"router",\u9884\u5148:"aot",\u7f16\u8bd1:"compile",\u7f16\u8bd1\u5668:"compiler",\u9884\u5148\u7f16\u8bd1:"aot compile",\u5143\u7d20:"element",\u6ce8\u89e3:"annotation",\u5e94\u7528\u5916\u58f3:"app-shell",\u5efa\u7b51\u5e08:"architect",\u5c5e\u6027:"propert",\u7ed1\u5b9a:"binding",\u5f15\u5bfc:"bootstrap",\u6784\u5efa\u5668:"builder",\u5927\u5c0f\u5199\u7c7b\u578b:"case types",\u53d8\u66f4\u68c0\u6d4b:"change detection",\u7c7b:"class",\u5b57\u6bb5:"field",\u96c6\u5408:"collection",\u547d\u4ee4\u884c:"cli",\u5185\u5bb9:"content",\u6295\u5f71:"projection",\u81ea\u5b9a\u4e49:"custom",\u6570\u636e:"data",\u53ef\u58f0\u660e\u5bf9\u8c61:"declarable",\u88c5\u9970:"decorat",\u9886\u57df\u7279\u5b9a\u8bed\u8a00:"dsl",\u52a8\u6001:"dynamic",\u52a0\u8f7d:"load",\u6025\u6027:"eager",\u7d27\u6025:"eager",\u5165\u53e3\u70b9:"entry point",\u8868\u5355:"form",\u63a7\u4ef6:"control",\u6a21\u578b:"model",\u9a8c\u8bc1:"validation",\u4e0d\u53ef\u53d8\u6027:"immutability",\u53ef\u6ce8\u5165\u5bf9\u8c61:"injectable",\u8f93\u5165:"input",\u63d2\u503c:"interpolation",\u5373\u65f6\u7f16\u8bd1:"jit",\u60f0\u6027:"lazy",\u61d2:"lazy",\u5e93:"library",\u751f\u547d\u5468\u671f:"lifecycle",\u5305:"package",\u53ef\u89c2\u5bdf\u5bf9\u8c61:"observable",\u89c2\u5bdf\u8005:"observer",\u8f93\u51fa\u5c5e\u6027:"output",\u5e73\u53f0:"platform",\u817b\u5b50:"polyfill",\u9879\u76ee:"project",\u54cd\u5e94\u5f0f:"reactive",\u89e3\u6790\u5668:"resolver",\u5b88\u536b:"guard",\u51fa\u53e3:"outlet",\u89c4\u5219:"rule",\u539f\u7406\u56fe:"schematic",\u8303\u56f4\u5316:"scoped",\u6e32\u67d3:"render",\u5448\u73b0:"render",\u72ec\u7acb:"standalone",\u7ed3\u6784\u578b:"structural",\u8ba2\u9605\u8005:"subscriber",\u76ee\u6807:"target",\u9a71\u52a8:"driven",\u8868\u8fbe\u5f0f:"expression",\u5f15\u7528:"reference",\u53d8\u91cf:"variable",\u8f6c\u8bd1:"transpile",\u76ee\u5f55\u6811:"tree",\u914d\u7f6e:"config",\u5355\u5411:"uni",\u53cc\u5411:"bidi",\u89c6\u56fe:"view",\u89c6\u56fe\u6811:"view hierarchy",\u591a\u5c42:"hierarchy",\u5206\u5c42:"hierarchy",\u591a\u7ea7:"hierarchy",\u5c42\u6b21\u5316:"hierarchy",\u5de5\u4f5c\u533a:"workspace",\u533a\u57df:"zone",\u5c01\u88c5:"encapsulation",\u9519\u8bef:"error",\u4e8b\u4ef6:"event",\u5f02\u5e38:"exception",\u6d4b\u8bd5:"test",\u8868\u73b0:"presentation",\u5355\u4f8b:"singleton",\u642d\u5efa:"setup",\u5efa\u7acb:"setup",\u90e8\u7f72:"deploy",\u6784\u5efa:"build",\u67b6\u6784:"architecture",\u4ea4\u4e92:"interact",\u6837\u5f0f:"style",\u98ce\u683c:"style",\u5185\u7f6e:"built",\u5185\u5efa:"built",\u7ec4\u5408:"composition",\u53d8\u66f4:"change",\u66f4\u6539:"change",\u53d8\u5316:"change",\u8986\u76d6\u7387:"coverage",\u573a\u666f:"scenario",\u56fd\u9645\u5316:"i18n",\u65e0\u969c\u788d:"accessibility",\u53ef\u8bbf\u95ee\u6027:"accessibility",\u672c\u5730\u5316:"localiz",\u8bed\u8a00\u73af\u5883:"locale",\u7ffb\u8bd1:"translat",\u52a8\u753b:"animation",\u89e6\u53d1\u5668:"trigger",\u8f6c\u573a:"transition",\u590d\u7528:"reus",\u5b89\u5168:"security",\u6d4f\u89c8\u5668:"browser",\u547d\u4ee4:"command",\u7279\u6027:"feature",\u9009\u62e9\u5668:"selector",\u9009\u62e9:"select"};let P;const t={};function o(a){a=a.replace(/^["']|['"]$/g,"");try{if(a.length){const l=(a=function T(a){return Object.entries(O).sort(([h],[p])=>-h.localeCompare(p)).reduce((h,[p,f])=>h.replace(new RegExp(p,"g"),`${f} `),a).replace(/[^\w\s]/g," ")}(a)).replace(/\S+/g,"+$&");let u=P.search(l);if(0===u.length&&(u=P.search(a)),0===u.length){const h="title:*"+a.split(" ",1)[0]+"*";u=P.search(a+" "+h)}return u.map(h=>t[h.ref])}}catch(l){console.error(l)}return[]}addEventListener("message",function r(a){const l=a.data.type,u=a.data.id,h=a.data.payload;switch(l){case"load-index":!function i(a,l){const u=new XMLHttpRequest;u.onload=function(){l(JSON.parse(this.responseText))},u.open("GET",a),u.send()}("/generated/docs/app/search-data.json",p=>{P=function e(a){return w.QueryLexer.termSeparator=w.tokenizer.separator=/\s+/,w(function(){this.pipeline.remove(w.stemmer),this.ref("path"),this.field("topics",{boost:15}),this.field("title",{boost:10}),this.field("headings",{boost:5}),this.field("members",{boost:4}),this.field("keywords",{boost:2}),a(this)})}(function n({dictionary:a,pages:l}){const u=a.split(" ");return h=>{l.forEach(p=>{const f=function s(a,l){return{...a,headings:a.headings?.map(u=>l[u]).join(" ")??"",keywords:a.keywords?.map(u=>l[u]).join(" ")??"",members:a.members?.map(u=>l[u]).join(" ")??""}}(p,u);h.add(f),t[f.path]=f})}}(p)),postMessage({type:l,id:u,payload:!0})});break;case"query-index":postMessage({type:l,id:u,payload:{query:h,results:o(h)}});break;default:postMessage({type:l,id:u,payload:{error:"invalid message type"}})}})})()})();
//# sourceMappingURL=src_app_search_search_worker_ts.72c6de9b6e537e09.js.map