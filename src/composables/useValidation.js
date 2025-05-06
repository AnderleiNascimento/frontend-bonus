import messages from '@/helpers/messages';  
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

export function useValidation() {
  function validationMessage(response) {
    if (response) {
      if (response.status) {
        _getMessageStatus(response)
      } else if (response.code != undefined) {
        _getMessageCode(response)
      }
    }
  }

  function _getMessageStatus(response) {
    switch (response.status) {
      case 422:
        let validationErrors = ''

        let errors = _getResponseErrors(response)

        for (const key in errors) {
          validationErrors += errors[key][0] + '<br>'
        }

        setMessages({ message: validationErrors, title: 'Informação.', state: 'bg-info' })
        break
      case 200:
      case 201:
        setMessages({ message: _getResponseMessage(response) })
        break
      case 400:
      case 403:
        setMessages({ message: _getResponseMessage(response), title: 'Atenção', state: 'bg-warning' })
        break
      case 401:
      case 409:
        setMessages({ message: _getResponseMessage(response), title: '', state: 'bg-danger' })
        break
      default:
        setMessages({
          message: messages.INTERNAL_ERROR,
          title: 'Erro Interno.',
          state: 'danger'
        })
        console.error(response)
        break
    }
  }

  function _getMessageCode(res) {
    if (res.response != undefined && res.response.data.message != undefined) {
      return setMessages({ message: _getResponseMessage(res), title: 'Atenção.', state: 'bg-danger' })
    }

    switch (res.code) {
      case 'ERR_BAD_REQUEST':
        setMessages({
          message: messages.ERR_BAD_REQUEST,
          title: 'Atenção.',
          state: 'warning'
        })
        break
      default:
        setMessages({
          message: messages.ERR_NETWORK,
          title: 'Erro Interno.',
          state: 'danger'
        })
        break
    }
  }

  function setMessages({ message = '', title = 'Sucesso', state = 'bg-primary' }, scrollUp = false) {
    toast.setMessage(message, title, state)

    if (scrollUp) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  function _getResponseMessage(response) {
    if (response.data != undefined) {
      if (response.data.message != undefined) {
        return response.data.message
      }
    }

    if (response.response != undefined) {
      if (response.response.data != undefined && response.response.data.message != undefined) {
        return response.response.data.message
      }
    }
  }

  function _getResponseErrors(response) {
    if (response.data != undefined) {
      if (response.data.errors != undefined) {
        return response.data.errors
      }
    }

    if (response.response != undefined) {
      if (response.response.data != undefined && response.response.data.errors != undefined) {
        return response.response.data.errors
      }
    }
  }

  return {
    validationMessage,
    setMessages
  }
}
