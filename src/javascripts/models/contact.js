class Contact {
  /**
   * Constructor of Contact object
   * @param {Object} data
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.relation = data.relation;
    this.phone = data.phone;
    this.email = data.email;
    this.avatar = data.avatar;
  }
}

export default Contact;
