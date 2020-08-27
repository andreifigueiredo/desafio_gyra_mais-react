import axios from "axios";
import sinon from "sinon";
import moment from "moment";

import { listMessages, createMessages } from "../MessageActions";

describe("MessageActions", () => {
  let sandbox;

  beforeEach(() => (sandbox = sinon.createSandbox()));
  afterEach(() => sandbox.restore());

  it("with a success listMessages call should call the correct action response", async () => {
    const now = moment();
    const resolved = new Promise((resolve) =>
      resolve({
        data: {
          mensagens: [
            {
              _id: 1,
              texto: "Texto texte",
              nomeRemetente: "Nome teste",
              createdAt: now,
            },
            {
              _id: 2,
              texto: "Texto texte",
              nomeRemetente: "Nome teste",
              createdAt: now,
            },
          ],
        },
      })
    );
    sandbox.stub(axios, "get").returns(resolved);

    let response = await listMessages();
    expect(response).toMatchObject({
      data: {
        mensagens: [
          {
            _id: 1,
            texto: "Texto texte",
            nomeRemetente: "Nome teste",
            createdAt: now,
          },
          {
            _id: 2,
            texto: "Texto texte",
            nomeRemetente: "Nome teste",
            createdAt: now,
          },
        ],
      },
    });
  });

  it("with a success createMessages call should call the correct action response", async () => {
    const now = moment();
    const resolved = new Promise((resolve) =>
      resolve({
        data: {
          mensagem: {
            _id: 1,
            texto: "Texto texte",
            nomeRemetente: "Nome teste",
            createdAt: now,
          },
        },
      })
    );
    sandbox.stub(axios, "post").returns(resolved);

    let response = await createMessages();
    expect(response).toMatchObject({
      data: {
        mensagem: {
          _id: 1,
          texto: "Texto texte",
          nomeRemetente: "Nome teste",
          createdAt: now,
        },
      },
    });
  });
});
