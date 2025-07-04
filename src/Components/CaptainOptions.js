import React from 'react';
import styled from 'styled-components';

const CaptainOptions = ({ onSetCaptain, onSetViceCaptain, isCaptain, isViceCaptain }) => {
  return (
    <OptionsContainer>
      <OptionButton 
        isActive={isCaptain}
        onClick={(e) => {
          e.stopPropagation();
          onSetCaptain();
        }}
      >
        C
      </OptionButton>
      <OptionButton 
        isActive={isViceCaptain}
        onClick={(e) => {
          e.stopPropagation();
          onSetViceCaptain();
        }}
      >
        VC
      </OptionButton>
    </OptionsContainer>
  );
};

const OptionsContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 6px;
`;

const OptionButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({ isActive, theme }) => 
    isActive ? theme.colors.success : theme.colors.border};
  background: ${({ isActive, theme }) => 
    isActive ? theme.colors.success : 'rgba(0,0,0,0.6)'};
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export default CaptainOptions;