import "./App.css";
import * as FinalForm from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import createDecorator from "final-form-calculate";
import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import CurrencyFormField from "./CurrencyFormField";
import IntegerFormField from "./IntegerFormField";

const getTotalOfInvoiceItems = (invoiceItems, shippingCost, tax) => {
  return (
    (invoiceItems.map((c) => c.quantity * c.unitPrice) || []).reduce(
      (sum, value) => sum + value,
      0
    ) +
    Number(shippingCost || 0) +
    Number(tax || 0)
  ).toFixed(2);
};

const calculator = createDecorator({
  field: /(shippingCost|tax|invoiceItems.*)/,
  updates: {
    total: (ignoredValue, allValues) =>
      getTotalOfInvoiceItems(
        allValues.invoiceItems,
        allValues.shippingCost,
        allValues.tax
      ),
  },
});

function App() {
  return (
    <div className="App">
      <header className="App-header">Final Form Calculate Example</header>
      <FinalForm.Form
        initialValues={{
          shippingCost: 5,
          tax: 1,
          invoiceItems: [{ quantity: 1, unitPrice: 1.99 }],
        }}
        onSubmit={(values) => alert(JSON.stringify(values))}
        decorators={[calculator]}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray name="invoiceItems">
              {({ fields }) => (
                <Table celled collapsing>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Unit Price</Table.HeaderCell>
                      <Table.HeaderCell>Extended price</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {fields.map((name, index) => (
                      <Table.Row key={name}>
                        <Table.Cell>
                          <IntegerFormField name={`${name}.quantity`} />
                        </Table.Cell>
                        <Table.Cell>
                          <CurrencyFormField name={`${name}.unitPrice`} />
                        </Table.Cell>
                        <Table.Cell>
                          $
                          {(
                            Number(fields.value[index].quantity || 0) *
                            Number(fields.value[index].unitPrice || 0)
                          ).toFixed(2)}
                        </Table.Cell>
                        <Table.Cell>
                          {fields.length !== 1 && (
                            <Button
                              icon
                              type="button"
                              onClick={() => fields.remove(index)}
                            >
                              <Icon name="trash" />
                            </Button>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell>
                        <Button
                          icon
                          type="button"
                          onClick={() =>
                            fields.push({ unitPrice: 1, quantity: 1.0 })
                          }
                        >
                          <Icon name="plus" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell></Table.Cell>
                      <Table.HeaderCell>Shipping Cost</Table.HeaderCell>
                      <Table.Cell>
                        <CurrencyFormField name="shippingCost" />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell></Table.Cell>
                      <Table.HeaderCell>Tax</Table.HeaderCell>
                      <Table.Cell>
                        <CurrencyFormField name="tax" />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell></Table.Cell>
                      <Table.HeaderCell>Total</Table.HeaderCell>
                      <Table.Cell>
                        <CurrencyFormField name="total" disabled readOnly />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell>
                        <Button type="submit" primary>
                          Save
                        </Button>
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              )}
            </FieldArray>
          </form>
        )}
      />
    </div>
  );
}

export default App;
