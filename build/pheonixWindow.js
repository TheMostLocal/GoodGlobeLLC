"use strict";
(self.webpackChunkcomicvine = self.webpackChunkcomicvine || []).push([[3821], {
    4461: (e,n,t)=>{
        var i = t(3749);
        const m = document.getElementById("js-meta-is-premium");
        m ? window.Phoenix.User = {
            isPremium: ()=>"premium" === m.content
        } : document.URL.match(/(2300-6462359)|(2300-6462516)|(2300-6462585)|(2300-6462705)|(2300-6462703)|(2300-6462823)|(2300-6462892)|(2300-6462945)|(2300-6463060)|(2300-6463059)|(2300-6463065)/) && (window.Phoenix.User = {
            isPremium: ()=>!0
        }),
        window.Phoenix.userLoggedIn = ()=>(0,
        i.Z)()
    }
    ,
    3749: (e,n,t)=>{
        function i() {
            return "loggedIn" === document.querySelector("meta[name=userAuthState]").content
        }
        t.d(n, {
            Z: ()=>i
        })
    }
}, e=>{
    var n;
    n = 4461,
    e(e.s = n)
}
]);
