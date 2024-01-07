import React, { useState } from 'react';
import { AccordionProps } from './Accordion.types';
import { AccordionContainer, AccordionContentElement, AccordionElement, AccordionHeaderElement } from './Accordion.styled';

export function Accordion({ children, header, defaultIsOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onToggle = () => {
    setIsOpen(_ => !_);
  }

  return (
    <AccordionElement>
      <AccordionHeaderElement $open={isOpen} onClick={onToggle}>
        <AccordionContainer style={{ justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold', width: '100%' }}>{header}</div>
          <i className={`fa ${isOpen ? 'fa-caret-down' : 'fa-caret-up'}`} />
        </AccordionContainer>
      </AccordionHeaderElement>
      {
        isOpen && (
          <AccordionContentElement>
            <AccordionContainer>
              {children}
            </AccordionContainer>
          </AccordionContentElement>
        )
      }
    </AccordionElement>
  )
}