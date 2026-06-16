import React, { useMemo, useState } from "react";
import { Text, TextStyle, View } from "react-native";

const ExpandableDescription = ({
  text,
  numberOfLines = 3,
  maxWords,
  textClassName = "",
  viewMoreClassName = "",
  textStyle,
  viewMoreStyle,
}: {
  text: string;
  numberOfLines?: number;
  maxWords?: number;
  textClassName?: string;
  viewMoreClassName?: string;
  textStyle?: TextStyle;
  viewMoreStyle?: TextStyle;
}) => {
  const [expanded, setExpanded] = useState(false);

  const { shouldTruncate, truncatedText } = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const limit = maxWords ?? numberOfLines * 18; // rough average of ~18 words per line
    if (words.length <= limit) {
      return {
        shouldTruncate: false,
        truncatedText: text,
      };
    }
    return {
      shouldTruncate: true,
      truncatedText: `${words.slice(0, limit).join(" ")}...`,
    };
  }, [maxWords, numberOfLines, text]);

  return (
    <View>
      <Text className={textClassName} style={textStyle}>
        {expanded || !shouldTruncate ? text : truncatedText}
      </Text>
      {shouldTruncate && (
        <Text
          className={viewMoreClassName}
          style={viewMoreStyle}
          onPress={() => setExpanded((e) => !e)}
        >
          {expanded ? "View less" : "View more"}
        </Text>
      )}
    </View>
  );
};

export default ExpandableDescription;
