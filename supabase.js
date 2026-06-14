(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.supabase = {}));
})(this, (function (exports) { 'use strict';
    // Standalone minimal client wrapper to prevent network blocking bugs
    exports.createClient = function (url, key) {
        return {
            auth: {
                signUp: async function (credentials) {
                    try {
                        const response = await fetch(`${url}/auth/v1/signup`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'apikey': key },
                            body: JSON.stringify(credentials)
                        });
                        return await response.json();
                    } catch (err) { return { error: err }; }
                },
                signInWithPassword: async function (credentials) {
                    try {
                        const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'apikey': key },
                            body: JSON.stringify(credentials)
                        });
                        const data = await response.json();
                        if (response.ok) { return { data: { session: data }, error: null }; }
                        return { data: null, error: data };
                    } catch (err) { return { data: null, error: err }; }
                }
            }
        };
    };
    Object.defineProperty(exports, '__esModule', { value: true });
}));
