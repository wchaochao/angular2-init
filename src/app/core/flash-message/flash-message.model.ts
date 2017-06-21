export class FlashMessage {
  static nextId = 0;
  static icons = {
    info: 'info',
    warning: 'warning',
    danger: 'close',
    success: 'check'
  };

  id: number;
  type: string;
  text: string;
  icon: string;

  constructor(options: {
    type?: string,
    text?: string,
    icon?: string
  } = {}) {
    this.id = (FlashMessage.nextId++);
    this.type = options.type || 'warning';
    this.text = options.text || 'default text';
    this.icon = options.icon || FlashMessage.icons[this.type];
  }
}
