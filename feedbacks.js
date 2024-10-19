export function getFeedbackDefinitions(self) {
	return {
		panel_lock: {
			type: 'boolean',
			name: 'Device: Panel buttons locked',
			description: 'Check if the panel buttons are currently locked',
			options: [],
			callback: (feedback) => {
				const result = self.getVariableValue('device_panel_locked')
				return result
			},
		},
		device_power: {
			type: 'boolean',
			name: 'Device: Powered on',
			description: 'Check the current power state of the device',
			options: [],
			callback: (feedback) => {
				const result = self.getVariableValue('device_powered_on')
				return result
			},
		},
		device_beep: {
			type: 'boolean',
			name: 'Device: Beep enabled',
			description: 'Check the current button beep state of the device',
			options: [],
			callback: (feedback) => {
				const result = self.getVariableValue('device_beep_enabled')
				return result
			},
		},
		output_at_input: {
			type: 'boolean',
			name: 'Output: Specific input is active source',
			description: 'Check if a specific input source is currently selected for a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '1',
					choices: [
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'input',
					label: 'Input',
					default: '1',
					choices: [
						{ id: '1', label: 'Input 1' },
						{ id: '2', label: 'Input 2' },
						{ id: '3', label: 'Input 3' },
						{ id: '4', label: 'Input 4' },
					],
				},
			],
			callback: (feedback) => {
				const selectedOutput = feedback.options.output // Get the selected output
				const selectedInput = `input${feedback.options.input}` // Construct input variable ID
				const currentInputSource = self.getVariableValue(`output${selectedOutput}_input_source`)

				return currentInputSource === selectedInput
			},
		},
		output_at_audio_input: {
			type: 'boolean',
			name: 'Output: Specific audio input is active external audio source',
			description:
				'Check if a specific input audio source is currently selected as a specific output external audio source',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '1',
					choices: [
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'input',
					label: 'Input',
					default: '1',
					choices: [
						{ id: '1', label: 'Input 1' },
						{ id: '2', label: 'Input 2' },
						{ id: '3', label: 'Input 3' },
						{ id: '4', label: 'Input 4' },
					],
				},
			],
			callback: (feedback) => {
				const selectedOutput = feedback.options.output
				const selectedInput = `input${feedback.options.input}`
				const currentInputSource = self.getVariableValue(`output${selectedOutput}_external_audio_source`)

				return currentInputSource === selectedInput
			},
		},
		output_streaming: {
			type: 'boolean',
			name: 'Output: Stream State',
			description: 'Check if a specific outputcurrently streaming or not',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '1',
					choices: [
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
			],
			callback: (feedback) => {
				const result = self.getVariableValue(`output${feedback.options.output}_stream`)

				return result
			},
		},
	}
}
