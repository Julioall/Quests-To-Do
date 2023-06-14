import QuestList from "./QuestList";
import { render, screen } from "@testing-library/react";
import { test, describe } from "@jest/globals";

const createdQuests = [
  {
    id: 1,
    title: "Falar com o ferreiro",
    status: "aberto",
    created_at: new Date(Date.now()).toUTCString(),
  },
  {
    id: 2,
    title: "Falar com a princesa",
    status: "aberto",
    created_at: new Date(Date.now()).toUTCString(),
  },
];

describe("Testando lista", () => {
  test("Ver se a quantidade é igual ao número de elementos na lista", () => {
    render(<QuestList quests={createdQuests} />);
    expect(screen.getAllByTestId("questItem").length).toBe(2);
  });
});
