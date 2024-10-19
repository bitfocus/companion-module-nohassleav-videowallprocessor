import { InstanceBase, InstanceStatus, runEntrypoint } from '@companion-module/base'

import { getActionDefinitions } from './actions.js'
import { ConfigFields } from './config.js'
import { getFeedbackDefinitions } from './feedbacks.js'
import { getPresetDefinitions } from './presets.js'
import { variables } from './variables.js'

import net from 'net'

class HDMIVideoWallProcessor extends InstanceBase {
	async init(config) {
		this.config = config

		this.setActionDefinitions(getActionDefinitions(this))
		this.setFeedbackDefinitions(getFeedbackDefinitions(this))
		this.setPresetDefinitions(getPresetDefinitions(this))
		this.setVariableDefinitions(variables)

		this.init_tcp()
	}

	delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	init_tcp() {
		// If there's already a socket, destroy it
		if (this.socket) {
			this.socket.destroy()
			this.socket = null
		}

		// If host is configured, initiate a new connection
		if (this.config.host) {
			this.createSocket() // Create a new socket and handle connections
		}
	}
	createSocket() {
		// Create a new socket instance
		this.socket = new net.Socket()

		this.socket.setKeepAlive(true, 10000) // Keep the connection alive
		this.socket.setTimeout(5000)

		// Connect to the configured host and port
		this.socket.connect(this.config.port, this.config.host, () => {
			this.log('debug', 'Connected')
			this.updateStatus(InstanceStatus.Ok)
		})

		// On receiving data
		this.socket.on('data', (buffer) => {
			const indata = buffer.toString('utf8')
			this.parseIncomingData(indata)
		})

		// Handle errors
		this.socket.on('error', (err) => {
			this.log('error', 'Network error: ' + err.message)
			this.updateStatus(InstanceStatus.Error, err.message)
			this.reconnect()
		})

		// On connection end
		this.socket.on('end', () => {
			this.log('error', 'Connection ended')
			this.updateStatus(InstanceStatus.Disconnected)
			this.reconnect()
		})

		// Handle disconnection
		this.socket.on('close', (hadError) => {
			if (hadError) {
				this.log('error', 'Socket closed due to an error.')
			} else {
				this.log('error', 'Socket closed.')
			}
			this.updateStatus(InstanceStatus.Disconnected)
			this.reconnect() // Attempt to reconnect when the socket is closed
		})
	}

	// Reconnection logic
	reconnect() {
		// If autoReconnect is enabled and there's no existing reconnect attempt
		if (this.config.autoReconnect && !this.reconnectTimeout) {
			this.log('debug', 'Attempting to reconnect in 5 seconds...')
			this.reconnectTimeout = setTimeout(() => {
				this.reconnectTimeout = null // Clear the timeout reference
				this.createSocket() // Attempt to create a new connection
			}, 5000) // Reconnect after 5 seconds
		}
	}

	// Destroy the socket and clear reconnection timeout if any
	destroySocket() {
		if (this.socket) {
			this.socket.destroy()
			this.socket = null
		}
		if (this.reconnectTimeout) {
			clearTimeout(this.reconnectTimeout)
			this.reconnectTimeout = null
		}
	}

	async sendMessage(message) {
		try {
			await this.socket.write(message + '\r\n')
			return true
		} catch (error) {
			this.log('error', 'Failed to send message: ' + error.message)
			return false
		}
	}

	async sendMessage(message) {
		return new Promise((resolve, reject) => {
			this.socket.write(message + '\r\n', (error) => {
				if (error) {
					return reject(error)
				}
				resolve(true)
			})
		})
	}

	getStatus() {
		const message = 'r status!'
		this.sendMessage(message)
	}

	setPanelLockState(state) {
		var message = ''
		switch (state) {
			case 'toggle':
				message = `s lock ${this.getVariableValue('device_panel_locked') ? '0' : '1'}!`
				break
			case 'lock':
				message = `s lock 1!`
				break
			case 'unlock':
				message = `s lock 0!`
		}
		this.sendMessage(message)
	}

	getPanelLockState() {
		const message = 'r lock!'
		this.socket.write(message)
	}

	setPowerState(power) {
		let message = ''
		switch (power) {
			case '0':
			case '1':
				message = `s power ${power}!`
				break
			case '2':
				const powerState = this.getVariableValue('device_powered_on')
				message = `s power ${powerState ? '0' : '1'}!`
				break
		}
		this.sendMessage(message)
	}

	getPowerState() {
		const message = `r power!`
		this.sendMessage(message)
	}

	setBeepMode(beep) {
		let message = ''
		switch (beep) {
			case '0':
			case '1':
				message = `s beep ${beep}!`
				break
			case '2':
				const beepState = this.getVariableValue('device_beep_enabled')
				message = `s beep ${beepState ? '0' : '1'}!`
				break
		}
		this.sendMessage(message)
	}

	getBeepMode() {
		const message = `r beep!`
		this.sendMessage(message)
	}

	async recallPreset(preset) {
		const message = `s recall preset ${preset}!`
		this.sendMessage(message)
	}

	savePreset(preset) {
		const message = `s save preset ${preset}!`
		this.sendMessage(message)
	}

	clearPreset(preset) {
		const message = `s clear preset ${preset}!`
		this.sendMessage(message)
	}

	setOutputDisplayMode(mode) {
		const message = `s display mode ${mode}!`
		this.sendMessage(message)
	}

	getOutputDisplayMode() {
		const message = `r display mode!`
		this.sendMessage(message)
	}

	setOutputResolution(output, resolution) {
		const message = `s output ${output} res ${resolution}!`
		this.sendMessage(message)
	}

	getOutputResolution(output) {
		const message = `r output ${output} res!`
		this.sendMessage(message)
	}

	setOutputColorSpace(output, csc) {
		const message = `s output ${output} csc ${csc}!`
		this.sendMessage(message)
	}

	getOutputColorSpace(output) {
		const message = `r output ${output} csc!`
		this.sendMessage(message)
	}

	setOutputHDCP(output, hdcp) {
		const message = `s output ${output} hdcp ${hdcp}!`
		this.sendMessage(message)
	}

	getOutputHDCP(output) {
		const message = `r output ${output} hdcp!`
		this.sendMessage(message)
	}

	setOutputVMirror(output, vmirror) {
		const message = `s output ${output} vmirror ${vmirror}!`
		this.sendMessage(message)
	}

	setOutputHMirror(output, hmirror) {
		const message = `s output ${output} hmirror ${hmirror}!`
		this.sendMessage(message)
	}

	getOutputMirror(output) {
		const message = `r output ${output} mirror!`
		this.sendMessage(message)
	}

	setOutputStream(output, stream) {
		let message = ''
		switch (stream) {
			case '0':
			case '1':
				message = `s output ${output} stream ${stream}!`
				break
			case '2':
				const variableId = `output${output}_stream`
				const streamState = this.getVariableValue(variableId)

				const streamValue = streamState ? '0' : '1'

				message = `s output ${output} stream ${streamValue}!`
				break
		}
		this.sendMessage(message)
	}

	getOutputStream(output) {
		const message = `r output ${output} stream!`
		this.sendMessage(message)
	}

	setOutputBackground(background) {
		const message = `s output bg ${background}!`
		this.sendMessage(message)
	}

	getOutputBackground() {
		const message = `r output bg!`
		this.sendMessage(message)
	}

	setInputEDID(input, edid) {
		const message = `s input ${input} edid ${edid}!`
		this.sendMessage(message)
	}

	getInputEDID(input) {
		const message = `r input ${input} edid!`
		this.sendMessage(message)
	}

	routeInputToOutput(output, input) {
		const message = `s output ${output} in source ${input}!`
		this.sendMessage(message)
	}

	getInputToOutputRouting(output) {
		const message = `r output ${output} in source!`
		this.sendMessage(message)
	}

	setInputCECCommand(input, cec) {
		const message = `s cec in ${input} ${cec}!`
		this.sendMessage(message)
	}

	setOutputCECCommand(output, cec) {
		const message = `s cec hdmi out ${output} ${cec}!`
		this.sendMessage(message)
	}

	sendNetworkReboot() {
		const message = `s net reboot!`
		this.sendMessage(message)
	}

	sendReboot() {
		const message = `s reboot!`
		this.sendMessage(message)
	}

	setMultiViewDisplayMode(mode) {
		const message = `s multiview ${mode}!`
		this.sendMessage(message)
	}

	// No prefix for results?
	getMultiViewDisplayMode() {
		const message = `r multiview!`
		this.sendMessage(message)
	}

	setMultiViewWindowInput(window, input) {
		const message = `s window ${window} in ${input}!`
		this.sendMessage(message)
	}

	getMultiViewWindowInput(window) {
		const message = `r window ${window} in!`
		this.sendMessage(message)
	}

	setPiPPosition(position) {
		const message = `s pip position ${position}!`
		this.sendMessage(message)
	}

	getPiPPosition() {
		const message = `r pip position!`
		this.sendMessage(message)
	}

	setPiPSize(size) {
		const message = `s pip size ${size}!`
		this.sendMessage(message)
	}

	getPiPSize() {
		const message = `r pip size!`
		this.sendMessage(message)
	}

	setTWDisplayMode(mode) {
		const message = `s tw mode ${mode}!`
		this.sendMessage(message)
	}

	getTWDisplayMode() {
		const message = `r tw mode!`
		this.sendMessage(message)
	}

	setTWGroupInput(group, input) {
		const message = `s tw group ${group} input ${input}!`
		this.sendMessage(message)
	}

	getTWGroupInput(group) {
		const message = `r tw group ${group} source!`
		this.sendMessage(message)
	}

	setTWResolution(resolution) {
		const message = `s tw res ${resolution}!`
		this.sendMessage(message)
	}

	getTWResolution() {
		const message = `r tw res!`
		this.sendMessage(message)
	}

	setInputAudioConfig(input, audio) {
		const message = `s input ${input} as ${audio}!`
		this.sendMessage(message)
	}

	getInputAudioConfig(input) {
		const message = `r input ${input} as!`
		this.sendMessage(message)
	}

	setOutputExternalAudioState(output, audio) {
		const message = `s output ${output} exa ${audio}!`
		this.sendMessage(message)
	}

	getOutputExternalAudioState(output) {
		const message = `r output ${output} exa!`
		this.sendMessage(message)
	}

	setOutputExternalAudioMode(audio) {
		const message = `s output exa mode ${audio}!`
		this.sendMessage(message)
	}

	getOutputExternalAudioMode() {
		const message = `r output exa mode!`
		this.sendMessage(message)
	}

	routeAudioInputSourceToOutputExternalAudio(output, input) {
		const message = `s output ${output} exa in source ${input}!`
		this.sendMessage(message)
	}

	getAudioInputSourceToOutputExternalAudioRoute(output) {
		const message = `r output ${output} in source!`
		this.sendMessage(message)
	}

	setMultiViewResolution(resolution) {
		const message = `s mv res ${resolution}!`
		this.sendMessage(message)
	}

	getMultiViewResolution() {
		const message = `r mv res!`
		this.sendMessage(message)
	}

	setMultiViewAudioSource(source) {
		const message = `s mv output audio ${source}!`
		this.sendMessage(message)
	}

	getMultiViewAudioSource() {
		const message = `r mv output audio!`
		this.sendMessage(message)
	}

	parseIncomingData(data) {
		this.log('debug', 'Received: ' + data)

		const regexPatterns = {
			outputResolution: /output (\d+) resolution: (.+)$/,
			outputColorSpace: /output (\d+) csc: (.+)$/,
			outputHdcp: /output (\d+) hdcp: (.+)$/,
			outputHMirror: /output (\d+) h mirror (on|off)$/, // Separate h mirror
			outputVMirror: /output (\d+) v mirror (on|off)$/, // Separate v mirror
			outputMirror: /output (\d+) h mirror (on|off), v mirror (on|off)$/, // Combined h + v mirror
			outputStream: /output (\d+) stream: (enable|disable)$/,
			outputBackground: /output background: (.+)$/,
			inputEdid: /input (\d+) edid: (.+)$/,
			outputInputSource: /output (\d+) -> input (\d+)/,
			inputOutputTarget: /input (\d+) -> output (\d+)/,
			panelLock: /panel button lock (on|off)/,
			displayMode: /display mode: (.+)$/,
			tvWallMode: /tv wall mode: (.+)$/,
			tvWallGroupInput: /tv wall group (\d+) input: (.+)$/,
			tvWallResolution: /tv wall resolution: (.+)$/,
			inputAudioSetting: /input (\d+) select (hdmi original audio|embed analog audio)$/,
			outputExtAudio: /output (\d+) ext-audio: (enable|disable)$/,
			outputExtAudioMode: /output ext-audio mode: (.+)$/,
			outputExtAudioSource: /output (\d+) ext-audio->input (\d+)$/,
			multiViewResolution: /multi-viewer resolution: (.+)$/,
			multiViewAudioSource: /output audio: (.+)$/,
			pipPosition: /pip on (.+)$/,
			pipSize: /pip size: (.+)$/,
			multiviewWindowInput: /window (\d+) select (.+)$/,
			activePreset: /recall from preset (\d+)$/,
			devicePower: /power (on|off)/,
			deviceBeep: /beep (on|off)/,
			telnetConnected: /^\*{38}$/,
		}

		const variableMap = {
			outputResolution: (output, value) => [`output${output}_resolution`, value],
			outputColorSpace: (output, value) => [`output${output}_csc`, value],
			outputHdcp: (output, value) => [`output${output}_hdcp`, value],
			outputHMirror: (output, state) => [`output${output}_hmirror`, state === 'on'],
			outputVMirror: (output, state) => [`output${output}_vmirror`, state === 'on'],
			outputMirror: (output, hMirror, vMirror) => [
				[`output${output}_hmirror`, hMirror === 'on'],
				[`output${output}_vmirror`, vMirror === 'on'],
			],
			outputStream: (output, state) => [`output${output}_stream`, state === 'enable'],
			outputBackground: (mode) => ['output_background', mode],
			inputEdid: (input, value) => [`input${input}_edid`, value],
			outputInputSource: (output, input) => [`output${output}_input_source`, `input${input}`],
			inputOutputTarget: (input, output) => [`output${output}_input_source`, `input${input}`],
			panelLock: (state) => ['device_panel_locked', state === 'on'],
			displayMode: (mode) => ['output_display_mode', mode],
			tvWallMode: (mode) => ['tv_wall_display_mode', mode],
			tvWallGroupInput: (group, input) => [`tv_wall_group${group}_input`, input],
			tvWallResolution: (resolution) => ['tv_wall_resolution', resolution],
			inputAudioSetting: (input, setting) => [`input${input}_audio_setting`, setting],
			outputExtAudio: (output, state) => [`output${output}_external_audio_enabled`, state === 'enable'],
			outputExtAudioMode: (mode) => ['output_external_audio_mode', mode],
			outputExtAudioSource: (output, input) => [`output${output}_external_audio_source`, `input${input}`],
			multiViewResolution: (resolution) => ['multiview_resolution', resolution],
			multiViewAudioSource: (audiosource) => ['multiview_audio_source', audiosource],
			pipPosition: (position) => ['pip_position', position],
			pipSize: (size) => ['pip_size', size],
			multiviewWindowInput: (window, hdmiInput) => [`multiview_window${window}_input`, `${hdmiInput}`],
			activePreset: (preset) => ['last_loaded_preset', preset],
			devicePower: (power) => ['device_powered_on', power === 'on'],
			deviceBeep: (beep) => ['device_beep_enabled', beep === 'on'],
		}

		const matchAndSetVariable = (patternKey, message) => {
			const match = message.match(regexPatterns[patternKey])
			if (!match) return

			const [outputNumber, ...values] = match.slice(1)
			const variableEntries = variableMap[patternKey]?.(outputNumber, ...values)

			if (Array.isArray(variableEntries?.[0])) {
				variableEntries.forEach(([variableId, value]) => setVariableIfExists(variableId, value))
			} else if (variableEntries) {
				const [variableId, value] = variableEntries
				setVariableIfExists(variableId, value)
			}
		}

		const setVariableIfExists = (variableId, value) => {
			const variable = variables.find((v) => v.variableId === variableId)
			if (variable) {
				const variableData = { [variableId]: value }
				this.setVariableValues(variableData)
				this.log('info', `Set ${variableId} to ${value}`)
			} else {
				this.log('error', `Variable not found for ${variableId}`)
			}
		}

		const messages = data.split(/\r/)

		messages.forEach((message) => {
			if (message.trim() === '') return

			for (const patternKey in regexPatterns) {
				matchAndSetVariable(patternKey, message)
			}

			if (message.match(regexPatterns.outputInputSource) || message.match(regexPatterns.inputOutputTarget)) {
				this.checkFeedbacks('output_at_input')
			}
			if (message.match(regexPatterns.outputExtAudioSource)) {
				this.checkFeedbacks('output_at_audio_input')
			}
			if (message.match(regexPatterns.panelLock)) {
				this.checkFeedbacks('panel_lock')
			}
			if (message.match(regexPatterns.outputStream)) {
				this.checkFeedbacks('output_streaming')
			}
			if (message.match(regexPatterns.devicePower)) {
				this.checkFeedbacks('device_power')
			}
			if (message.match(regexPatterns.deviceBeep)) {
				this.checkFeedbacks('device_beep')
			}
			if (message.match(regexPatterns.activePreset)) {
				this.getStatus()
			}
			if (message.match(regexPatterns.telnetConnected)) {
				this.log('info', 'Telnet connection successfull - retreiving status.')
				this.getStatus()
			}
		})
	}

	async configUpdated(config) {
		this.config = config
		this.init_tcp()
	}

	async destroy() {}

	getConfigFields() {
		return ConfigFields
	}
}

runEntrypoint(HDMIVideoWallProcessor, [])
