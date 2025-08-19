import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operandA = ref(0)
    const operandB = ref(0)

    const operators = [
      { name: 'sum', symbol: '➕', func: (a, b) => a + b },
      { name: 'subtract', symbol: '➖', func: (a, b) => a - b },
      { name: 'multiply', symbol: '✖', func: (a, b) => a * b },
      { name: 'divide', symbol: '➗', func: (a, b) => (b !== 0 ? a / b : 'Деление на ноль') },
    ]
    const operatorsMap = Object.fromEntries(operators.map(operator => [operator.name, operator]))

    const currentOperator = ref(null)

    const result = computed(() => {
      const op = currentOperator.value
      return op && operatorsMap[op] ? operatorsMap[op].func(operandA.value, operandB.value) : 0
    })

    return {
      operandA,
      operandB,
      operators,
      currentOperator,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="operandA" />

      <div class="calculator__operators">
        <label
          v-for="operator in operators"
        >
          <input
            type="radio"
            name="operator"
            :value="operator.name"
            :key="operator.name"
            v-model="currentOperator"
          />
          {{ operator.symbol }}
        </label>
      </div>

      <input type="number" aria-label="Second operand" v-model="operandB"/>

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
