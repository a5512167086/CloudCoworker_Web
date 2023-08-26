import { useEffect, useState } from 'react';
import { StyledSelect } from './languageChanger.style';
import {
  MenuItem,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SELECT_LANGUAGES_LIST } from '@configs/common';
import { useTranslation } from 'react-i18next';
import i18n from '@configs/i18n';

export const LanguageChanger = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { resolvedLanguage, changeLanguage } = i18n;
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  const handleSelectLanguage = (event: SelectChangeEvent<unknown>) => {
    changeLanguage(event.target.value as string);
  };

  useEffect(() => {
    if (smUp || smDown) {
      handleSelectClose();
    }
  }, [smUp, smDown]);

  return (
    <StyledSelect
      open={isSelectOpen}
      onClose={handleSelectClose}
      onOpen={handleSelectOpen}
      onChange={handleSelectLanguage}
      value={resolvedLanguage}>
      {SELECT_LANGUAGES_LIST.map(({ title, value }) => (
        <MenuItem key={title} value={value}>
          {t(title)}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};
