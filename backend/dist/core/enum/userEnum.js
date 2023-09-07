"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEnum = exports.UserEnum = void 0;
var UserEnum;
(function (UserEnum) {
    UserEnum["allnotFound"] = "Nenhum usu\u00E1rio encontrado.";
    UserEnum["notFound"] = "Usu\u00E1rio n\u00E3o encontrado.";
    UserEnum["exist"] = "Usu\u00E1rio j\u00E1 cadastrado.";
})(UserEnum = exports.UserEnum || (exports.UserEnum = {}));
var AuthEnum;
(function (AuthEnum) {
    AuthEnum["Unauthorized"] = "Acesso n\u00E3o autorizado, verifique suas credenciais ou contate o administrador.";
    AuthEnum["InvalidPassword"] = "Senha inv\u00E1lida";
})(AuthEnum = exports.AuthEnum || (exports.AuthEnum = {}));
//# sourceMappingURL=userEnum.js.map