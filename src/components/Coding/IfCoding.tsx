const IfCoding = (props: any) => {
  const { value, is, have, children } = props;

  let _then = children,
    _else: any = [],
    _else_if: any = [];

  switch (typeof children) {
    case 'object':
      if (children.length) {
        _then = children.map((child: any) => {
          const {
            type: { name },
          } = child;
          switch (name) {
            case 'ElseCoding':
              _else.push(child);
              return null;
            case 'ElseIfCoding':
              _else_if.push(child);
              return null;
            default:
              return child;
          }
        });
      }
      break;
    default:
      _then = children;
  }

  const isTrue = (have && value.includes(have)) || value === is;

  return isTrue ? _then : [..._else, ..._else_if];
};

export default IfCoding;
