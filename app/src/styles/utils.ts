type PaddingValue = string | number | undefined;

export const padding = (a: PaddingValue, b?: PaddingValue, c?: PaddingValue, d?: PaddingValue) => {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}