interface IData {
  status: number;
  message: string;
  name: string;
}
class SettingsAlreadyExists extends Error {
  public data: IData;
  constructor(message: string) {
    super(message);
    this.name = 'SettingsAlreadyExists';
    this.data = {
      status: 400,
      message,
      name: this.name,
    };
  }
}

export { SettingsAlreadyExists };
