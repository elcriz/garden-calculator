const plantsService = {
  retrieveMonth: async (month) => {
    try {
      const response = await fetch('/data/plants.json');
      if (!response.ok) {
        throw new Error(response.status);
      }
      const plants = await response.json();

      const items = plants.reduce((previous, plant) => {
        const tasks = plant.tasks.filter(task => task.months.indexOf(month) !== -1);
        if (tasks.length === 0) {
          return previous;
        }
        return [...previous, {
          ...plant, tasks,
        }];
      }, []);

      return items;
    } catch (error) {
      throw error;
    }
  }
};

export default plantsService;
