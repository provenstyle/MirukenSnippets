$toastr: function(spec, title) {
            if ($isString(spec)) {
                spec = { success: { message: spec, title: title } };
            }
            return this.filter(function (callback, composer, proceed) {
                var promise = null,
                    success = spec['success'],
                    error   = spec['error'];

                try {
                    var handled = proceed();
                    if (handled) {
                        if ((promise = getEffectivePromise(callback))) {
                            if (success) {
                                promise.then(function () {
                                    _toastSuccess(success);
                                });
                            }
                            if (error) {
                                promise.catch(function () {
                                    _toastError(error);
                                });
                            }
                        } else {
                            _toastSuccess(success);
                        }
                    }
                    return handled;
                } catch (exception) {
                    _toastError(error);
                    throw exception;
                }
            });
        }
