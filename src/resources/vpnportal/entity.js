const entity = {
  "description": "Vpn虚拟门户",
  "type": "object",
  "properties": {
    "id": {
      "$ref": "#/components/schemas/UUID",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "name": {
      "type": "string",
      "description": "名称",
      "x-mock": "@ctitle",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "description": {
      "type": "string",
      "description": "备注",
      "x-mock": "@cparagraph",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "status": {
      "$ref": "#/components/schemas/SiteResourceStatus",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "host": {
      "$ref": "#/components/schemas/Host",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "logo": {
      "type": "string",
      "description": "客户端logo",
      "x-mock": "@image",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "clientImage": {
      "type": "string",
      "description": "客户端背景图",
      "x-mock": "@image",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "indexHtml": {
      "type": "string",
      "description": "客户端登录页html",
      "x-mock": "<!doctype html5><html><body>登录页面</body></html>",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "clientColor": {
      "type": "string",
      "description": "客户端背景色",
      "x-mock": "@color",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "clientTitle": {
      "type": "string",
      "description": "客户端标题",
      "x-mock": "@ctitle",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "welcomeMessage": {
      "type": "string",
      "description": "欢迎语",
      "x-mock": "@cparagraph",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "announcement": {
      "type": "string",
      "description": "公告",
      "x-mock": "@cparagraph",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "copyRight": {
      "type": "string",
      "description": "版权消息",
      "x-mock": "@cparagraph",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "site": {
      "x-$ref": "#/components/schemas/Site",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "creator": {
      "type": "integer",
      "description": "创建人",
      "x-$ref": "#/components/schemas/Admin",
      "x-mock": "@integer",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "createAt": {
      "type": "string",
      "format": "date-time",
      "description": "创建时间",
      "x-mock": "@datetime",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "updateAt": {
      "type": "string",
      "format": "date-time",
      "description": "更新时间",
      "x-mock": "@datetime",
      "x-gen-shape": {
        "x-view": "text"
      }
    }
  }
};

export default entity;
