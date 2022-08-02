const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./veggarden");

const corn = {
  name: "corn",
  yield: 30,
  factor: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },

    wind: {
      lots: -60,
      medium: -30,
      little: 0,
    },
  },
};
const environmentFactors = {
  sun: "medium",
  wind: "little",
};


describe("getYieldForPlant", () => {
 
  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(30);
  });

  test("Get yield for plant with environment factors", () => {
    environmentFactors.wind = "lots";
    environmentFactors.sun = "high";
    expect(getYieldForPlant(corn, environmentFactors)).toBe(18);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };
    environmentFactors.wind = "little";
    environmentFactors.sun = "medium";
    expect(getYieldForCrop(input, environmentFactors)).toBe(30);
  });

  test("Get yield for crop with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };

    environmentFactors.wind = "lots";
    environmentFactors.sun = "medium";

    expect(getYieldForCrop(input, environmentFactors)).toBe(12);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];

    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total yield with multiple crops including environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const crops = [
      { crop: corn, numCrops: 5 }, 
      { crop: pumpkin, numCrops: 2 }, 
    ];

    const environmentFactors = {
      sun: "medium",
      wind: "little",
    };

    expect(getTotalYield({ crops }, environmentFactors)).toBe(23);
  });
});

describe("getCostsForCrop", () => {
  test("Get cost for crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
    };
    const input = {
      crop: corn,
      numCrops: 2,
    };
    expect(getCostsForCrop(input)).toBe(2);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const input = {
      crop: corn,
      numCrops: 2,
    };

    const environmentFactors = {
      sun: "medium",
      wind: "little",
    };

    expect(getRevenueForCrop(input, environmentFactors)).toBe(12);
  });

  test("Get revenue for crop with environmentFactors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };

    const input = {
      crop: corn,
      numCrops: 2,
    };

    const environmentFactors = {
      sun: "high",
      wind: "little",
    };

    expect(getRevenueForCrop(input, environmentFactors)).toBe(18);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      costs: 1,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 2,
    };
    const environmentFactors = {
      sun: "medium",
      wind: "little",
    };

    expect(getProfitForCrop(input, environmentFactors)).toBe(10); 
  });

  test("Get profit for crop with environmentFactors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      costs: 1,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },

        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 2,
    };

    const environmentFactors = {
      sun: "medium",
      wind: "little",
    };

    expect(getProfitForCrop(input, environmentFactors)).toBe(10); 
  });
});

describe("getTotalProfit for multiple crops", () => {
  test("Calculate total profit with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      costs: 1,
	  factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      salePrice: 5,
      costs: 1,
	  factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    const environmentFactors = {
      sun: "medium",
      wind: "little",
    };

    expect(getTotalProfit({ crops }, environmentFactors)).toBe(63);
  });

  test("Calculate total profit with multiple crops including environmentFactors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      costs: 1,
	  factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      salePrice: 5,
      costs: 1,
	  factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          lots: -60,
          medium: -30,
          little: 0,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    const environmentFactors = {
      sun: "medium",
      wind: "little",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(63);
  });
});
