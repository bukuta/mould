const entity = {
  "type": "object",
  "description": "管理员",
  "properties": {
    "id": {
      "type": "string",
      "x-mock": "@uuid",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "name": {
      "type": "string",
      "x-mock": "@word",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "cname": {
      "type": "string",
      "x-mock": "@cname",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "password": {
      "type": "string",
      "x-mock": "",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "passwordType": {
      "$ref": "#/components/schemas/PasswordType",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "role": {
      "$ref": "#/components/schemas/AdminRole",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "status": {
      "type": "integer",
      "description": "用户目前的状态(0允许/1禁止/2锁定)",
      "enum": [
        0,
        1,
        2
      ],
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "ldapId": {
      "type": "string",
      "x-mock": "@uuid",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "dn": {
      "type": "string",
      "x-mock": "cn=@word,ou=xxx,dc=ldap,dc=com",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "creator": {
      "type": "integer",
      "x-$ref": "#/components/schemas/DeviceType",
      "x-mock": "@integer",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "createAt": {
      "type": "string",
      "format": "date-time",
      "x-mock": "@datetime",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "updateAt": {
      "type": "string",
      "format": "date-time",
      "x-mock": "@datetime",
      "x-gen-shape": {
        "x-view": "text"
      }
    }
  }
};

export default entity;
