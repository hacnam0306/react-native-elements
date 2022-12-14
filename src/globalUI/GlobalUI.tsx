import React from 'react';
import GlobalUIManager from './GlobalUIManager';
import FlashMessage, {
  MessageOptions,
  showMessage,
} from 'react-native-flash-message';
import {
  BottomActionItemProps,
  BottomActionSheet,
} from './libs/BottomActionSheet';
import {
  SelectedItemProps,
  SelectOptionItemProps,
  SelectOptionSheet,
} from './libs/SelectOptionSheet';
import {SelectTagsSheet} from './libs/SelectTagsSheet';
import {DateTimePickerModal} from './libs/DateTimePickerModal';
import {DatePickerProps} from 'react-native-date-picker';

export interface GlobalUIState {
  isLoading: boolean;
  loadingMsg: string;
  isVisible: boolean;
  isSingleImage: boolean;
  postId: string;
}

type Props = {
  t?: any;
};
export class GlobalUIComp extends React.Component<Props, GlobalUIState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      loadingMsg: '',
      isVisible: false,
      isSingleImage: false,
      postId: '',
    };
    GlobalUIManager.view = this;
  }
  bottomSheetRef = React.createRef<any>();
  selectOptionSheetRef = React.createRef<any>();
  selectTagsSheetRef = React.createRef<any>();
  dateTimePickerModalRef = React.createRef<any>();

  showFlashMsg = (alertOpts: MessageOptions) => {
    showMessage(alertOpts);
  };

  showErrorFlashMsg = (alertOpts?: MessageOptions) => {
    const {t} = this.props;
    showMessage({
      message: alertOpts?.message || 'Có lỗi xảy ra!',
      type: 'danger',
      ...alertOpts,
    });
  };

  showSuccessFlashMsg = (alertOpts?: MessageOptions) => {
    showMessage({
      message: alertOpts?.message || 'Thành công!',
      type: 'success',
      ...alertOpts,
    });
  };

  showBottomActionSheet = (title: string, actions: BottomActionItemProps[]) => {
    this.bottomSheetRef.current?.show(title, actions);
  };

  showSelectTagsSheet = (
    title: string,
    tags: string[],
    onSetValue: (text: string) => void,
  ) => {
    this.selectTagsSheetRef.current?.show(title, tags, onSetValue);
  };

  showSelectOptionSheet = (
    title: string,
    getItems: () => Promise<SelectOptionItemProps[]>,
    onSelect: ((value: string) => void) | undefined,
    selectedValues: SelectedItemProps[],
    multiple: boolean,
    onSubmitEditing: () => void,
  ) => {
    this.selectOptionSheetRef.current?.show(
      title,
      getItems,
      onSelect,
      selectedValues,
      multiple,
      onSubmitEditing,
    );
  };

  showDateTimePicker = (
    datePickerProps: DatePickerProps,
    onConfrimDate?: (dateStr: string) => void,
  ) => {
    this.dateTimePickerModalRef.current?.show(datePickerProps, onConfrimDate);
  };

  render() {
    return (
      <>
        <FlashMessage position="top" />
        <BottomActionSheet ref={this.bottomSheetRef} />
        <SelectOptionSheet ref={this.selectOptionSheetRef} />
        <SelectTagsSheet ref={this.selectTagsSheetRef} />
        <DateTimePickerModal ref={this.dateTimePickerModalRef} />
      </>
    );
  }
}

export const GlobalUI = GlobalUIComp;
