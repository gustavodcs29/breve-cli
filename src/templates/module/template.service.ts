export const __CAPITALIZED_NAME__Service = {
  async getAll() {
    // TODO: Implementar lógica
    return [];
  },
  async getById(id: number) {
    return { id, name: "__CAPITALIZED_NAME__ example" };
  },
  async create(data: any) {
    return { id: Date.now(), ...data };
  },
};
