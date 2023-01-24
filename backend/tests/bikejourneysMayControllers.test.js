const {
  sortBikejourneysMay,
  createNewBikejourneysMay,
  updateBikejourneysMayById,
  deleteBikejourneysMayById,
} = require("../controllers/bikejourneysMayControllers");
const BikejourneysMay = require("../models/BikejourneysMay");

jest.mock("../models/BikejourneysMay");

const request = {
  query: {
    limit: 10,
    skip: 10,
    page: 2,
    sort: "-date",
  },
  params: { id: "1234" },
  body: {
    departure: "fake_departure",
    return: "fake_return",
    departureStationId: "fake_departureStationId",
    departureStationName: "fake_departureStationName",
    returnStationId: "fake_returnStationId",
    returnStationName: "fake_returnStationName",
    distance: "fake_distance",
    duration: "fake_duration",
  },
};

// const response = {
//   status: jest.fn().mockReturnThis(),
//   json: jest.fn().mockReturnThis(),
// };
const response = {
  status: jest.fn(() => response),
  json: jest.fn(() => response),
};

// test("should sort BikejourneysMay and return a 200 status code", async () => {
//   const mockedQuery = {
//     limit: jest.fn().mockResolvedValue(),
//     skip: jest.fn().mockResolvedValue(),
//     sort: jest.fn().mockResolvedValue(),
//     allowDiskUse: jest.fn().mockResolvedValue(),
//     exec: jest.fn().mockResolvedValue(),
//   };
//   BikejourneysMay.find.mockReturnValue(mockedQuery);

//   await sortBikejourneysMay(request, response);
//   expect(response.status).toHaveBeenCalledWith(200);
//   expect(response.json).toHaveBeenCalledWith({ success: true, data: {} });
// });

test("should create a new bike journey and return a 201 status code", async () => {
  BikejourneysMay.create.mockResolvedValue({});
  await createNewBikejourneysMay(request, response);
  expect(response.status).toHaveBeenCalledWith(201);
  expect(response.json).toHaveBeenCalledWith({ success: true, data: {} });
});

test("should update a bike journey and return a 201 status code", async () => {
  BikejourneysMay.findById.mockResolvedValue({});
  await updateBikejourneysMayById(request, response);
  expect(response.status).toHaveBeenCalledWith(201);
  expect(response.json).toHaveBeenCalledWith({ success: true, data: {} });
});

test("should delete a bike journey and return a 200 status code", async () => {
  BikejourneysMay.findById.mockResolvedValue({
    remove: jest.fn().mockResolvedValue(),
  });
  await deleteBikejourneysMayById(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith({ success: true, data: {} });
});
