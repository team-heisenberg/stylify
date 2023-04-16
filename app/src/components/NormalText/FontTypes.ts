const getDinamicFontSize = (value: number) => {
  if (value <= 0) {
    return "1em";
  }

  return `${value / 1.3}em`;
};

export const Heading1 = {
  fontSize: 32,
  lineHeight: 39,
  fontWeight: "normal",
  fontFamily: "PlayfairDisplay_400Regular",
};

export const Heading1Bold = {
  fontSize: 24,
  lineHeight: 30,
  fontWeight: "bold",
  fontFamily: "PlayfairDisplay_700Bold",
};

export const Heading2 = {
  fontSize: 28,
  lineHeight: 35,
  fontWeight: "normal",
  fontFamily: "PlayfairDisplay_400Regular",
};

export const Heading3 = {
  fontSize: 24,
  lineHeight: 30,
  fontWeight: "normal",
  fontFamily: "PlayfairDisplay_400Regular",
};

export const Heading4 = {
  fontSize: 20,
  lineHeight: 26,
  fontWeight: "bold",
  fontFamily: "PlayfairDisplay_700Bold",
};

export const Heading5 = {
  fontSize: 14,
  lineHeight: 19,
  fontWeight: "normal",
  fontFamily: "PlayfairDisplay_400Regular",
};

export const Heading6 = {
  fontSize: 15,
  lineHeight: 19,
  fontWeight: "normal",
  fontFamily: "PlayfairDisplay_400Regular",
};

export const Heading7 = {
  fontSize: 15,
  lineHeight: 19,
  fontWeight: "bold",
  fontFamily: "PlayfairDisplay_700Bold",
};

export const SubHeading1 = {
  fontSize: 20,
  lineHeight: 31,
  fontWeight: "900",
  fontFamily: "Figtree_700Bold",
};

export const SubHeading2 = {
  fontSize: 18,
  lineHeight: 27,
  fontWeight: "normal",
  fontFamily: "Figtree_400Regular",
};

export const BodyBold = {
  fontSize: 16,
  lineHeight: 27,
  fontWeight: "600",
  fontFamily: "Figtree_700Bold",
};

export const BodyBold2 = {
  fontSize: 14,
  lineHeight: 21,
  fontWeight: "700",
  fontFamily: "Figtree_700Bold",
};

export const BodyRegular = {
  fontSize: 16,
  lineHeight: 27,
  fontWeight: "normal",
  fontFamily: "Figtree_400Regular",
};

export const Button = {
  fontSize: 16,
  lineHeight: 27,
  fontWeight: "bold",
  fontFamily: "Figtree_700Bold",
};

export const Link = {
  fontSize: 16,
  lineHeight: 27,
  fontWeight: "normal",
  fontFamily: "Figtree_400Regular",
};

export const captions = {
  fontSize: 12,
  lineHeight: 25,
  fontWeight: "normal",
  fontFamily: "Figtree_400Regular",
};

export const captionsForInput = {
  fontSize: 20,
  lineHeight: 25,
  fontWeight: "normal",
  fontFamily: "Figtree_400Regular",
};
