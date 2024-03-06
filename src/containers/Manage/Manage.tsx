import { CustomManageForm } from '@components/CustomManageForm';
import { StyledManage } from './manage.style';
import { ManageSection } from '@components/ManageSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@store/index';
import { getUserOrganization } from '@store/modules/organizationSlice';
import { Status } from '@configs/type';

export const Manage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const { organizationId, status } = useSelector(
    (state: RootState) => state.organization,
  );
  useEffect(() => {
    dispatch(getUserOrganization());
  }, []);

  useEffect(() => {
    if (isLoading && status !== Status.Idle) {
      setIsLoading(false);
    }
  }, [status]);

  return (
    !isLoading && (
      <StyledManage>
        {organizationId ? <ManageSection /> : <CustomManageForm />}
      </StyledManage>
    )
  );
};
