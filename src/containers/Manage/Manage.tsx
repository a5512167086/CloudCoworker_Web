import { CustomManageForm } from '@components/CustomManageForm';
import { StyledManage } from './manage.style';
import { ManageSection } from '@components/ManageSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '@store/index';
import { getUserOrganization } from '@store/modules/organizationSlice';

export const Manage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userOrganization } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getUserOrganization());
  }, []);

  return (
    <StyledManage>
      {userOrganization ? <ManageSection /> : <CustomManageForm />}
    </StyledManage>
  );
};
