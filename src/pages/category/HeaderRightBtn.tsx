import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({category}: RootState) => {
  return {
    isEdit: category.isEdit,
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  onSubmit: () => void;
}

const HeaderRightBtn: React.FC<IProps> = ({onSubmit, isEdit}) => {
  return (
    <HeaderButtons>
      <Item title={isEdit ? '完成' : '编辑'} onPress={onSubmit} />
    </HeaderButtons>
  );
};

export default connector(HeaderRightBtn);
