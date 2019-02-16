export interface TransUnit {
  _attributes: {
    id: string;
    datatype: string;
  }
  source: {
    _text: string;
  }
  target?: {
    _text: string;
  }
  'context-group': any
  note: {
    _attributes: {
      priority: string;
      from: string;
    };
    _text: string;
  }
}

export interface Xml {
  _declaration: {
    _attributes: {
      version: string;
      encoding: string;
    };
  }
  xliff: {
    _attributes: {
      version: string;
      xmlns: string;
    };
    file: {
      _attributes: {
        'source-language': string;
        datatype: string;
        original: string;
      };
      body: {
        'trans-unit': TransUnit[];
      };
    };
  }
}
