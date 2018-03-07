const entity = {
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
      "x-mock": "@ctitle",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "type": {
      "$ref": "#/components/schemas/DeviceType",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "description": {
      "type": "string",
      "x-mock": "@cparagraph",
      "x-gen-shape": {
        "x-view": "text",
        "x-edit": "input",
        "x-create": "input"
      }
    },
    "version": {
      "type": "string",
      "x-mock": "VPN-1.0",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "mac": {
      "type": "string",
      "x-mock": "@mac",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "group": {
      "type": "string",
      "description": "所属同步组",
      "x-$ref": "#/components/schemas/Device",
      "x-mock": "@uid",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "status": {
      "$ref": "#/components/schemas/DeviceConnectionStatus",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "maximumUsers": {
      "type": "integer",
      "description": "最大同时在线用户数",
      "format": "int32",
      "x-mock": "@integer(0,10000)",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "expireDate": {
      "description": "使用期限",
      "type": "string",
      "x-mock": "@datetime",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "registerAt": {
      "description": "主动注册时间, 设备主动请求snc的时间",
      "type": "string",
      "format": "date-time",
      "x-mock": "@datetime",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "lastSyncAt": {
      "description": "上次同步时间",
      "type": "string",
      "format": "date-time",
      "x-mock": "@datetime",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "lastSyncSucceedAt": {
      "description": "上次成功同步时间",
      "type": "string",
      "format": "date-time",
      "x-mock": "@datetime",
      "x-gen-shape": {
        "x-view": "text"
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
