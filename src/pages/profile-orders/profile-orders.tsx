import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  userOrdersList
} from '../../services/slices/userOrders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orders: TOrder[] = useSelector(userOrdersList);

  return <ProfileOrdersUI orders={orders} />;
};
