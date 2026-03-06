import React from 'react';
import type { ComponentProps } from 'react';



// import { StyleProp, TextStyle } from 'react-native';

import { Card as PaperCard, RadioButton as PaperRadioButton } from 'react-native-paper';
import { PaperRadioButtonProps } from '~/components/ui';











export type PaperCardProps = ComponentProps<typeof PaperCard>;

interface CardComponent extends React.FC<PaperCardProps> {
  Actions: typeof PaperCard.Actions;
  Content: typeof PaperCard.Content;
  Cover: typeof PaperCard.Cover;
  Title: typeof PaperCard.Title;
}

export const CardBase: React.FC<PaperCardProps> = ({
  children,
  ...rest
}) => {
  return (
    <PaperCard {...rest}>
      {children}
    </PaperCard>
  );
};

export const Card = CardBase as CardComponent;
Card.Actions = PaperCard.Actions;
Card.Content = PaperCard.Content;
Card.Cover = PaperCard.Cover;
Card.Title = PaperCard.Title;
