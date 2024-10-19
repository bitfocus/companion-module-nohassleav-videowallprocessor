export function getActionDefinitions(self) {
	return {
		lock: {
			name: 'Device: Lock panel buttons',
			description: 'Lock/Unlock the button on the panel',
			options: [
				{
					type: 'dropdown',
					id: 'command',
					label: 'Action',
					default: 'lock',
					choices: [
						{ id: 'lock', label: 'Lock' },
						{ id: 'unlock', label: 'Unlock' },
						{ id: 'toggle', label: 'Toggle' },
					],
				},
			],
			callback: async (action) => {
				self.setPanelLockState(action.options.command)
			},
		},
		device_power: {
			name: 'Device: Control power',
			description: 'Power On/Off the device',
			options: [
				{
					type: 'dropdown',
					id: 'power',
					label: 'Action',
					default: '2',
					choices: [
						{ id: '0', label: 'Power Off' },
						{ id: '1', label: 'Power On' },
						{ id: '2', label: 'Toggle' },
					],
				},
			],
			callback: async (action) => {
				self.setPowerState(action.options.power)
			},
		},
		device_beep: {
			name: 'Device: Control beep',
			description: 'Enable/Disable the button beep on the device',
			options: [
				{
					type: 'dropdown',
					id: 'beep',
					label: 'Action',
					default: '2',
					choices: [
						{ id: '0', label: 'Beep Off' },
						{ id: '1', label: 'Beep On' },
						{ id: '2', label: 'Toggle' },
					],
				},
			],
			callback: async (action) => {
				self.setBeepMode(action.options.beep)
			},
		},

		reboot_device: {
			name: 'Device: Reboot',
			description: 'Send a reboot command to the complete device',
			options: [],
			callback: async () => {
				self.sendReboot()
			},
		},
		reboot_network_modules: {
			name: 'Device: Reboot Network module',
			description: 'Send a reboot command to the network module in the device',
			options: [],
			callback: async () => {
				self.sendNetworkReboot()
			},
		},
		recall_preset: {
			name: 'Preset: Recall',
			description: 'Recall a preset on the device',
			options: [
				{
					type: 'dropdown',
					id: 'preset',
					label: 'Preset',
					default: '1',
					choices: [
						{ id: '1', label: 'Preset 1' },
						{ id: '2', label: 'Preset 2' },
						{ id: '3', label: 'Preset 3' },
						{ id: '4', label: 'Preset 4' },
						{ id: '5', label: 'Preset 5' },
						{ id: '6', label: 'Preset 6' },
						{ id: '7', label: 'Preset 7' },
						{ id: '8', label: 'Preset 8' },
					],
				},
			],
			callback: async (action) => {
				self.recallPreset(action.options.preset)
			},
		},
		save_preset: {
			name: 'Preset: Save',
			description: 'Save the current configuration to a preset in the device',
			options: [
				{
					type: 'dropdown',
					id: 'preset',
					label: 'Preset',
					default: '1',
					choices: [
						{ id: '1', label: 'Preset 1' },
						{ id: '2', label: 'Preset 2' },
						{ id: '3', label: 'Preset 3' },
						{ id: '4', label: 'Preset 4' },
						{ id: '5', label: 'Preset 5' },
						{ id: '6', label: 'Preset 6' },
						{ id: '7', label: 'Preset 7' },
						{ id: '8', label: 'Preset 8' },
					],
				},
			],
			callback: async (action) => {
				self.savePreset(action.options.preset)
			},
		},
		clear_preset: {
			name: 'Preset: Clear',
			description: 'Clear a preset in the device',
			options: [
				{
					type: 'dropdown',
					id: 'preset',
					label: 'Preset',
					default: '1',
					choices: [
						{ id: '1', label: 'Preset 1' },
						{ id: '2', label: 'Preset 2' },
						{ id: '3', label: 'Preset 3' },
						{ id: '4', label: 'Preset 4' },
						{ id: '5', label: 'Preset 5' },
						{ id: '6', label: 'Preset 6' },
						{ id: '7', label: 'Preset 7' },
						{ id: '8', label: 'Preset 8' },
					],
				},
			],
			callback: async (action) => {
				self.clearPreset(action.options.preset)
			},
		},
		output_display_mode: {
			name: 'Output: Set display mode',
			description: 'Set the output display mode',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Display mode',
					default: '0',
					choices: [
						{ id: '0', label: 'Matrix Mode' },
						{ id: '1', label: 'Video Wall Mode' },
						{ id: '2', label: 'Multi-Viewer Mode' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputDisplayMode(action.options.mode)
			},
		},
		output_resolution: {
			name: 'Output: Set resolution',
			description: 'Set the resolution for all or a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'resolution',
					label: 'Resolution',
					default: '16',
					choices: [
						{ id: '1', label: '4096x2160p60' },
						{ id: '2', label: '4096x2160p50' },
						{ id: '3', label: '3840x2160p60' },
						{ id: '4', label: '3840x2160p50' },
						{ id: '5', label: '3840x2160p30' },
						{ id: '6', label: '1920x1080p60' },
						{ id: '7', label: '1920x1080p50' },
						{ id: '8', label: '1920x1080i60' },
						{ id: '9', label: '1920x1080i50' },
						{ id: '10', label: '1920x1200p60rb' },
						{ id: '11', label: '1360x768p60' },
						{ id: '12', label: '1280x800p60' },
						{ id: '13', label: '1280x720p60' },
						{ id: '14', label: '1280x720p50' },
						{ id: '15', label: '1024x768p60' },
						{ id: '16', label: 'Auto' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputResolution(action.options.output, action.options.resolution)
			},
		},
		output_color_space: {
			name: 'Output: Set color space',
			description: 'Set the color space for all or a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'csc',
					label: 'Color space',
					default: '1',
					choices: [
						{ id: '1', label: 'rgb444' },
						{ id: '2', label: 'ycbcr444' },
						{ id: '3', label: 'ycbcr422' },
						{ id: '4', label: 'ycbcr420' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputColorSpace(action.options.output, action.options.csc)
			},
		},
		output_hdcp: {
			name: 'Output: Set HDCP mode',
			description: 'Set the HDCP mode for all or a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'hdcp',
					label: 'HDCP',
					default: '1',
					choices: [
						{ id: '1', label: 'HDCP 1.4' },
						{ id: '2', label: 'HDCP 2.2' },
						{ id: '3', label: 'Follow Sink' },
						{ id: '4', label: 'Follow Source' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputHDCP(action.options.output, action.options.hdcp)
			},
		},
		output_mirror_v: {
			name: 'Output: Mirror vertical',
			description: 'Set the y-mirror mode for all or a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'mirror',
					label: 'V-Mirror',
					default: '0',
					choices: [
						{ id: '0', label: 'V-Mirror Off' },
						{ id: '1', label: 'V-Mirror On' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputVMirror(action.options.output, action.options.mirror)
			},
		},
		output_mirror_h: {
			name: 'Output: Mirror horizontal',
			description: 'Set the h-mirror mode for all or a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'mirror',
					label: 'H-Mirror',
					default: '0',
					choices: [
						{ id: '0', label: 'H-Mirror Off' },
						{ id: '1', label: 'H-Mirror On' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputHMirror(action.options.output, action.options.mirror)
			},
		},
		output_stream: {
			name: 'Output: Set stream mode',
			description: 'Set the stream mode for all or a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'stream',
					label: 'Stream',
					default: '0',
					choices: [
						{ id: '0', label: 'Stream Disable' },
						{ id: '1', label: 'Stream Enable' },
						{ id: '2', label: 'Toggle' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputStream(action.options.output, action.options.stream)
			},
		},
		output_cec_commands: {
			name: 'Output: Send CEC command',
			description: 'Send a CEC command to all or a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'cec',
					label: 'CEC Command',
					default: 'on',
					choices: [
						{ id: 'on', label: 'Power On' },
						{ id: 'off', label: 'Power Off' },
						{ id: 'mute', label: 'Volume: Mute' },
						{ id: 'vol-', label: 'Volume: Down' },
						{ id: 'vol+', label: 'Volume: Up' },
						{ id: 'active', label: 'Active Source' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputCECCommand(action.options.output, action.options.cec)
			},
		},
		output_external_audio_state: {
			name: 'Output: Enable/Disable External Audio',
			description: 'Enable or disable the external audio for all or a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
						{ id: '1', label: 'Output 1' },
						{ id: '2', label: 'Output 2' },
						{ id: '3', label: 'Output 3' },
						{ id: '4', label: 'Output 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'audio',
					label: 'External Audio State',
					default: '0',
					choices: [
						{ id: '0', label: 'Disable External Audio' },
						{ id: '1', label: 'Enable External Audio' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputExternalAudioState(action.options.output, action.options.audio)
			},
		},
		output_external_audio_mode: {
			name: 'Output: Set External Audio Mode',
			description: 'Set the external audio mode for all outputs',
			options: [
				{
					type: 'dropdown',
					id: 'audio',
					label: 'External Audio Mode',
					default: '0',
					choices: [
						{ id: '0', label: 'Bind to Input' },
						{ id: '1', label: 'Bind to Output' },
						{ id: '2', label: 'Matrix' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputExternalAudioState(action.options.output, action.options.audio)
			},
		},
		output_background: {
			name: 'Output: Set background',
			description: 'Set the no-signal background mode for all outputs',
			options: [
				{
					type: 'dropdown',
					id: 'background',
					label: 'Background mode',
					default: '1',
					choices: [
						{ id: '1', label: 'Black Screen' },
						{ id: '2', label: 'Blue Screen' },
						{ id: '3', label: 'Color Bar' },
						{ id: '4', label: 'Gray Scale' },
						{ id: '5', label: 'Cross' },
						{ id: '6', label: 'Cross Hatch' },
					],
				},
			],
			callback: async (action) => {
				self.setOutputBackground(action.options.background)
			},
		},
		input_edid: {
			name: 'Input: Set EDID mode',
			description: 'Set the EDID mode for all or a specific input',
			options: [
				{
					type: 'dropdown',
					id: 'input',
					label: 'Input',
					default: '0',
					choices: [
						{ id: '0', label: 'All Inputs' },
						{ id: '1', label: 'Input 1' },
						{ id: '2', label: 'Input 2' },
						{ id: '3', label: 'Input 3' },
						{ id: '4', label: 'Input 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'edid',
					label: 'EDID Mode',
					default: '1',
					choices: [
						{ id: '1', label: '4k60, 2.0ch' },
						{ id: '2', label: '4k60, 5.1ch' },
						{ id: '3', label: '4k60, 7.1ch' },
						{ id: '4', label: '4k30, 2.0ch' },
						{ id: '5', label: '4k30, 5.1ch' },
						{ id: '6', label: '4k30, 7.1ch' },
						{ id: '7', label: '1080p, 2.0ch' },
						{ id: '8', label: '1080p, 5.1ch' },
						{ id: '9', label: '1080p, 7.1ch' },
						{ id: '10', label: 'wuxga, 2.0ch' },
						{ id: '11', label: '768p, 2.0ch' },
						{ id: '12', label: 'xga, 2.0ch' },
						{ id: '13', label: 'User 1' },
						{ id: '14', label: 'User 2' },
						{ id: '15', label: 'Copy Output 1' },
						{ id: '16', label: 'Copy Output 2' },
						{ id: '17', label: 'Copy Output 3' },
						{ id: '18', label: 'Copy Output 4' },
					],
				},
			],
			callback: async (action) => {
				self.setInputEDID(action.options.input, action.options.edid)
			},
		},
		route_input_to_output: {
			name: 'Route: Input to Output',
			description: 'Route an input to all or a specific output',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
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
			callback: async (action) => {
				self.routeInputToOutput(action.options.output, action.options.input)
			},
		},
		input_cec_commands: {
			name: 'Input: Send CEC command',
			description: 'Send a CEC command to all or a specific input',
			options: [
				{
					type: 'dropdown',
					id: 'input',
					label: 'Input',
					default: '0',
					choices: [
						{ id: '0', label: 'All Inputs' },
						{ id: '1', label: 'Input 1' },
						{ id: '2', label: 'Input 2' },
						{ id: '3', label: 'Input 3' },
						{ id: '4', label: 'Input 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'cec',
					label: 'CEC Command',
					default: 'on',
					choices: [
						{ id: 'on', label: 'Power On' },
						{ id: 'off', label: 'Power Off' },
						{ id: 'menu', label: 'Menu' },
						{ id: 'back', label: 'Back' },
						{ id: 'up', label: 'Menu: Up' },
						{ id: 'down', label: 'Menu: Down' },
						{ id: 'left', label: 'Menu: Left' },
						{ id: 'right', label: 'Menu: Right' },
						{ id: 'enter', label: 'Menu: Enter' },
						{ id: 'play', label: 'Play' },
						{ id: 'pause', label: 'Pause' },
						{ id: 'stop', label: 'Stop' },
						{ id: 'rew', label: 'Rewind' },
						{ id: 'ff', label: 'Fast Forward' },
						{ id: 'mute', label: 'Volume: Mute' },
						{ id: 'vol-', label: 'Volume: Down' },
						{ id: 'vol+', label: 'Volume: Up' },
						{ id: 'previuos', label: 'Previous' },
						{ id: 'next', label: ' Next' },
					],
				},
			],
			callback: async (action) => {
				self.setInputCECCommand(action.options.input, action.options.cec)
			},
		},
		mv_display_mode: {
			name: 'MultiView: Set display mode',
			description: 'Set the display mode for the MultiView',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Display mode',
					default: '1',
					choices: [
						{ id: '1', label: 'Single' },
						{ id: '2', label: 'PiP' },
						{ id: '3', label: 'Dual' },
						{ id: '4', label: 'Triple' },
						{ id: '5', label: 'Quad' },
						{ id: '6', label: 'User' },
					],
				},
			],
			callback: async (action) => {
				self.setMultiViewDisplayMode(action.options.mode)
			},
		},
		mv_window_input: {
			name: 'MultiView: Set window input',
			description: 'Set the input for a window in the current MultiView mode',
			options: [
				{
					type: 'dropdown',
					id: 'window',
					label: 'Window',
					default: '0',
					choices: [
						{ id: '0', label: 'All Windows' },
						{ id: '1', label: 'Window 1' },
						{ id: '2', label: 'Window 2' },
						{ id: '3', label: 'Window 3' },
						{ id: '4', label: 'Window 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'input',
					label: 'Input',
					default: '1',
					choices: [
						{ id: '1', label: 'HDMI 1' },
						{ id: '2', label: 'HDMI 2' },
						{ id: '3', label: 'HDMI 3' },
						{ id: '4', label: 'HDMI 4' },
					],
				},
			],
			callback: async (action) => {
				self.setMultiViewWindowInput(action.options.window, action.options.input)
			},
		},
		pip_position: {
			name: 'PiP: Set position',
			description: 'Set the position for the PiP window',
			options: [
				{
					type: 'dropdown',
					id: 'position',
					label: 'Position',
					default: '1',
					choices: [
						{ id: '1', label: 'Upper Left' },
						{ id: '2', label: 'Lower Left' },
						{ id: '3', label: 'Upper Right' },
						{ id: '4', label: 'Lower Right' },
					],
				},
			],
			callback: async (action) => {
				self.setPiPPosition(action.options.position)
			},
		},
		pip_size: {
			name: 'PiP: Set size',
			description: 'Set the size for the PiP window',
			options: [
				{
					type: 'dropdown',
					id: 'size',
					label: 'Size',
					default: '1',
					choices: [
						{ id: '1', label: 'Small' },
						{ id: '2', label: 'Middle' },
						{ id: '3', label: 'Large' },
					],
				},
			],
			callback: async (action) => {
				self.setPiPSize(action.options.size)
			},
		},
		tw_mode: {
			name: 'TV Wall: Set display mode',
			description: 'Set the display mode for the TV wall',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					default: '1',
					choices: [
						{ id: '1', label: '2x2 mode' },
						{ id: '2', label: '2x1 mode' },
						{ id: '3', label: '2x1-2 mode' },
						{ id: '4', label: '1x2 mode' },
						{ id: '5', label: '1x2-2 mode' },
						{ id: '6', label: '3x1 mode' },
						{ id: '7', label: '4x1 mode' },
						{ id: '8', label: '1x3 mode' },
						{ id: '9', label: '1x4 mode' },
					],
				},
			],
			callback: async (action) => {
				self.setTWDisplayMode(action.options.mode)
			},
		},
		tw_group_input: {
			name: 'TV Wall: Set group input source',
			description: 'Set the input source for a TV Wall group',
			options: [
				{
					type: 'dropdown',
					id: 'group',
					label: 'TV Wall Group',
					default: '0',
					choices: [
						{ id: '0', label: 'Group All' },
						{ id: '1', label: 'Group 1' },
						{ id: '2', label: 'Group 2' },
						{ id: '3', label: 'Group 3' },
						{ id: '4', label: 'Group 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'input',
					label: 'Input',
					default: '1',
					choices: [
						{ id: '1', label: 'HDMI 1' },
						{ id: '2', label: 'HDMI 2' },
						{ id: '3', label: 'HDMI 3' },
						{ id: '4', label: 'HDMI 4' },
					],
				},
			],
			callback: async (action) => {
				self.setTWGroupInput(action.options.group, action.options.input)
			},
		},
		tw_resolution: {
			name: 'TV Wall: Set resolution',
			description: 'Set the resolution for the TV Wall',
			options: [
				{
					type: 'dropdown',
					id: 'resolution',
					label: 'Resolution',
					default: '1',
					choices: [
						{ id: '1', label: '4096x2160p60' },
						{ id: '2', label: '4096x2160p50' },
						{ id: '3', label: '3840x2160p60' },
						{ id: '4', label: '3840x2160p50' },
						{ id: '5', label: '3840x2160p30' },
						{ id: '6', label: '1920x1080p60' },
						{ id: '7', label: '1920x1080p50' },
						{ id: '8', label: '1920x1080i60' },
						{ id: '9', label: '1920x1080i50' },
						{ id: '10', label: '1920x1200p60rb' },
						{ id: '11', label: '1360x768p60' },
						{ id: '12', label: '1280x800p60' },
						{ id: '13', label: '1280x720p60' },
						{ id: '14', label: '1280x720p50' },
						{ id: '15', label: '1024x768p60' },
					],
				},
			],
			callback: async (action) => {
				self.setTWResolution(action.options.resolution)
			},
		},
		input_audio_embedded: {
			name: 'Input: Audio Setting',
			description: 'Select HDMI original audio or embed analog audio for all or a specific input',
			options: [
				{
					type: 'dropdown',
					id: 'input',
					label: 'Input',
					default: '0',
					choices: [
						{ id: '0', label: 'All Inputs' },
						{ id: '1', label: 'Input 1' },
						{ id: '2', label: 'Input 2' },
						{ id: '3', label: 'Input 3' },
						{ id: '4', label: 'Input 4' },
					],
				},
				{
					type: 'dropdown',
					id: 'audio',
					label: 'Audio setting',
					default: '0',
					choices: [
						{ id: '0', label: 'HDMI Original Audio' },
						{ id: '1', label: 'Embed Analog Audio' },
					],
				},
			],
			callback: async (action) => {
				self.setInputAudioConfig(action.options.input, action.options.audio)
			},
		},
		route_input_audio_to_output_ext_audio: {
			name: 'Route input audio to output external audio',
			description: 'Route an audio input to a specific or all external audio outputs',
			options: [
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: '0',
					choices: [
						{ id: '0', label: 'All Outputs' },
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
			callback: async (action) => {
				self.routeAudioInputSourceToOutputExternalAudio(action.options.output, action.options.input)
			},
		},
		mv_resolution: {
			name: 'MultiView: Set resolution',
			description: 'Set the resolution for the MultiView',
			options: [
				{
					type: 'dropdown',
					id: 'resolution',
					label: 'Resolution',
					default: '1',
					choices: [
						{ id: '1', label: '4096x2160p60' },
						{ id: '2', label: '4096x2160p50' },
						{ id: '3', label: '3840x2160p60' },
						{ id: '4', label: '3840x2160p50' },
						{ id: '5', label: '3840x2160p30' },
						{ id: '6', label: '1920x1080p60' },
						{ id: '7', label: '1920x1080p50' },
						{ id: '8', label: '1920x1080i60' },
						{ id: '9', label: '1920x1080i50' },
						{ id: '10', label: '1920x1200p60rb' },
						{ id: '11', label: '1360x768p60' },
						{ id: '12', label: '1280x800p60' },
						{ id: '13', label: '1280x720p60' },
						{ id: '14', label: '1280x720p50' },
						{ id: '15', label: '1024x768p60' },
					],
				},
			],
			callback: async (action) => {
				self.setMultiViewResolution(action.options.resolution)
			},
		},
		mv_audio_source: {
			name: 'MultiView: Set audio Source',
			description: 'Set the audio source for the MultiView',
			options: [
				{
					type: 'dropdown',
					id: 'audiosource',
					label: 'Audio source',
					default: '0',
					choices: [
						{ id: '0', label: 'Follow Window 1 Selected Source' },
						{ id: '1', label: 'Input 1 Audio' },
						{ id: '2', label: 'Input 2 Audio' },
						{ id: '3', label: 'Input 3 Audio' },
						{ id: '4', label: 'Input 4 Audio' },
					],
				},
			],
			callback: async (action) => {
				self.setMultiViewAudioSource(action.options.audiosource)
			},
		},
	}
}
