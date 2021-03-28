class EmailHelper {
  public isValid(value: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    return regex.test(value);
  }
}

const emailHelper = new EmailHelper();
export default emailHelper;
