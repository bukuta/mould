const entity = {
  "type": "object",
  "description": "日志",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int32",
      "x-mock": "@integer",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "content": {
      "type": "string",
      "x-mock": "@cparagraph",
      "x-gen-shape": {
        "x-view": "text"
      }
    },
    "task": {
      "type": "string",
      "x-mock": "@uid",
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
