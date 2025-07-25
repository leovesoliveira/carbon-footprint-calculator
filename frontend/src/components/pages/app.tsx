import Layout from "../templates/layout";
import CalculatorStepper from "../organisms/calculator-stepper";
import CalculatorForm from "../organisms/calculator-form";

function App() {
  return (
    <Layout>
      <CalculatorForm>
        <CalculatorStepper />
      </CalculatorForm>
    </Layout>
  );
}

export default App;
