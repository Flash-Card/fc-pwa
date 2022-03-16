import { ReactNode } from 'react';

export interface IModalProps<K extends keyof HTMLElementTagNameMap = 'div'> {
  children: ReactNode;
  nodeId?: string;
  tagName?: K;
}

export interface IPopupProps {
  name: string;
  containerClassName?: string;
  className?: string;
  children: ReactNode;
  renderCancelBtn?: JSX.Element;
  refProxy?(el: HTMLDivElement): void;
}

export enum EDialogType {
  confirm = 'confirm',
  success = 'success',
  warning = 'warning',
  destructive = 'destructive',
}

export interface IDialogProps {
  name: string;
  isOpen: boolean;
  type: EDialogType;
  children: ReactNode;
  onClose(): void;
  onAction?(): void;
  onCancel?(): void;
  actionText?: string;
  cancelText?:string;
  loading?: boolean;
  buttons?: ReadonlyArray<JSX.Element | null>;
}
